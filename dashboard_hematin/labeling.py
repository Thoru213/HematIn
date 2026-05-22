"""
🏷️ Manual Labeling Tool — Tracking Pengeluaran
================================================
Script ini membantu proses manual labeling produk di kategori 'Lain-lain'
dengan cara mengelompokkan produk yang mirip menggunakan TF-IDF + cosine similarity.

Cara pakai:
    python labeling_tool.py --input pengeluaran_clean.csv

Output:
    pengeluaran_labeled.csv  → dataset dengan kategori yang sudah dilabeli
    labeling_progress.json   → progress labeling (bisa dilanjutkan kapan saja)
"""

import pandas as pd
import numpy as np
import json
import os
import argparse
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.cluster import AgglomerativeClustering

# ── Konfigurasi ──────────────────────────────────────────────────────────────
KATEGORI_LIST = [
    '1 - Makanan/Minuman',
    '2 - Hiburan',
    '3 - Elektronik',
    '4 - Belanja (Kebutuhan Harian)',
    '5 - Transportasi',
    '6 - Kesehatan',
    '7 - Tagihan/Utilitas',
    '8 - Cicilan/Asuransi',
    '9 - Lain-lain',
    's - Lewati (skip)',
    'q - Simpan & Keluar',
]

KATEGORI_MAP = {
    '1': 'Makanan/Minuman',
    '2': 'Hiburan',
    '3': 'Elektronik',
    '4': 'Belanja (Kebutuhan Harian)',
    '5': 'Transportasi',
    '6': 'Kesehatan',
    '7': 'Tagihan/Utilitas',
    '8': 'Cicilan/Asuransi',
    '9': 'Lain-lain',
}

PROGRESS_FILE = 'labeling_progress.json'
OUTPUT_FILE   = 'pengeluaran_labeled.csv'

# ── Warna terminal ────────────────────────────────────────────────────────────
class C:
    BOLD    = '\033[1m'
    CYAN    = '\033[96m'
    GREEN   = '\033[92m'
    YELLOW  = '\033[93m'
    RED     = '\033[91m'
    MAGENTA = '\033[95m'
    RESET   = '\033[0m'
    DIM     = '\033[2m'
    BG_BLUE = '\033[44m'
    BG_GREEN= '\033[42m'


# ── Fungsi clustering ─────────────────────────────────────────────────────────
def cluster_produk(produk_list: list, n_clusters: int = None, threshold: float = 0.4):
    """
    Mengelompokkan produk yang namanya mirip menggunakan TF-IDF + cosine similarity.
    Mengembalikan dict {cluster_id: [produk1, produk2, ...]}.
    """
    if len(produk_list) <= 1:
        return {0: produk_list}

    # TF-IDF vectorize
    vectorizer = TfidfVectorizer(
        analyzer='char_wb',   # character n-gram → lebih baik untuk nama produk
        ngram_range=(2, 4),
        min_df=1,
        sublinear_tf=True,
    )
    try:
        tfidf_matrix = vectorizer.fit_transform(produk_list)
    except Exception:
        return {i: [p] for i, p in enumerate(produk_list)}

    # Cosine similarity → distance matrix
    sim_matrix  = cosine_similarity(tfidf_matrix)
    dist_matrix = 1 - sim_matrix
    dist_matrix = np.clip(dist_matrix, 0, None)

    # Auto n_clusters jika tidak ditentukan
    if n_clusters is None:
        n_clusters = max(1, len(produk_list) // 4)

    n_clusters = min(n_clusters, len(produk_list))

    try:
        clustering = AgglomerativeClustering(
            n_clusters=n_clusters,
            metric='precomputed',
            linkage='average',
        )
        labels = clustering.fit_predict(dist_matrix)
    except Exception:
        labels = list(range(len(produk_list)))

    clusters = {}
    for idx, label in enumerate(labels):
        clusters.setdefault(label, []).append(produk_list[idx])

    # Urutkan cluster dari yang paling banyak anggota
    clusters = dict(sorted(clusters.items(), key=lambda x: -len(x[1])))
    # Re-index mulai dari 0
    clusters = {i: v for i, v in enumerate(clusters.values())}
    return clusters


# ── Fungsi load/save progress ─────────────────────────────────────────────────
def load_progress():
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE, 'r') as f:
            return json.load(f)
    return {}

def save_progress(progress: dict):
    with open(PROGRESS_FILE, 'w') as f:
        json.dump(progress, f, ensure_ascii=False, indent=2)


# ── Fungsi tampilan ───────────────────────────────────────────────────────────
def clear():
    os.system('cls' if os.name == 'nt' else 'clear')

def print_header(labeled: int, total: int, cluster_no: int, total_clusters: int):
    pct = labeled / total * 100 if total > 0 else 0
    bar_len = 30
    filled  = int(bar_len * labeled / total) if total > 0 else 0
    bar     = '█' * filled + '░' * (bar_len - filled)

    print(f"\n{C.BG_BLUE}{C.BOLD}  🏷️  MANUAL LABELING TOOL — Tracking Pengeluaran  {C.RESET}")
    print(f"{C.DIM}{'─' * 52}{C.RESET}")
    print(f"  Progress  : {C.CYAN}{bar}{C.RESET}  {C.BOLD}{labeled}/{total}{C.RESET} ({pct:.1f}%)")
    print(f"  Cluster   : {C.YELLOW}{cluster_no + 1} / {total_clusters}{C.RESET}")
    print(f"{C.DIM}{'─' * 52}{C.RESET}\n")

def print_cluster(cluster_no: int, products: list, nilai_map: dict):
    print(f"  {C.BOLD}{C.MAGENTA}📦 Grup #{cluster_no + 1} — {len(products)} produk serupa:{C.RESET}")
    for i, p in enumerate(products, 1):
        nilai = nilai_map.get(p, 0)
        print(f"    {C.DIM}{i:2}.{C.RESET} {p:<50} {C.GREEN}Rp {nilai:>8,.0f}{C.RESET}")
    print()

def print_menu():
    print(f"  {C.BOLD}Pilih kategori untuk semua produk di grup ini:{C.RESET}")
    for opt in KATEGORI_LIST:
        num = opt.split(' - ')[0] if ' - ' in opt else opt[0]
        label = opt.split(' - ')[1] if ' - ' in opt else opt[2:]
        if num.isdigit():
            print(f"    {C.CYAN}[{num}]{C.RESET} {label}")
        elif num == 's':
            print(f"    {C.YELLOW}[s]{C.RESET} Lewati (skip) — label satu per satu nanti")
        elif num == 'q':
            print(f"    {C.RED}[q]{C.RESET} Simpan & Keluar")
    print()

def print_individual_menu(product: str, nilai: float, idx: int, total: int):
    print(f"\n  {C.DIM}({idx}/{total}){C.RESET} {C.BOLD}{product}{C.RESET}  {C.GREEN}Rp {nilai:,.0f}{C.RESET}")
    print(f"  {C.BOLD}Kategori:{C.RESET}")
    for opt in KATEGORI_LIST:
        num = opt.split(' - ')[0] if ' - ' in opt else opt[0]
        label = opt.split(' - ')[1] if ' - ' in opt else opt[2:]
        if num.isdigit():
            print(f"    {C.CYAN}[{num}]{C.RESET} {label}")
        elif num == 's':
            print(f"    {C.YELLOW}[s]{C.RESET} Lewati")
        elif num == 'q':
            print(f"    {C.RED}[q]{C.RESET} Simpan & Keluar")


# ── Main labeling loop ────────────────────────────────────────────────────────
def run_labeling(input_file: str):
    # Load data
    print(f"\n{C.CYAN}Memuat data dari {input_file}...{C.RESET}")
    df = pd.read_csv(input_file)

    # Pastikan kolom ada
    required = ['nama_produk', 'kategori', 'total_rupiah']
    for col in required:
        if col not in df.columns:
            print(f"{C.RED}❌ Kolom '{col}' tidak ditemukan di file CSV!{C.RESET}")
            return

    # Ambil produk Lain-lain
    mask_lainlain = df['kategori'] == 'Lain-lain'
    df_lain = df[mask_lainlain].copy()

    if len(df_lain) == 0:
        print(f"{C.GREEN}✅ Tidak ada produk Lain-lain! Dataset sudah bersih.{C.RESET}")
        return

    # Nilai per produk (untuk tampilan)
    nilai_map = (
        df_lain.groupby('nama_produk')['total_rupiah']
        .sum()
        .to_dict()
    )

    # Load progress sebelumnya
    progress = load_progress()
    produk_unik = df_lain['nama_produk'].unique().tolist()
    sudah_dilabel = set(progress.keys())
    belum_dilabel = [p for p in produk_unik if p not in sudah_dilabel]

    print(f"  Total produk Lain-lain : {C.BOLD}{len(produk_unik)}{C.RESET}")
    print(f"  Sudah dilabel          : {C.GREEN}{len(sudah_dilabel)}{C.RESET}")
    print(f"  Belum dilabel          : {C.YELLOW}{len(belum_dilabel)}{C.RESET}")

    if len(belum_dilabel) == 0:
        print(f"\n{C.GREEN}✅ Semua produk sudah dilabel! Menyimpan output...{C.RESET}")
        save_output(df, progress, input_file)
        return

    input(f"\n  {C.DIM}Tekan Enter untuk mulai labeling...{C.RESET}")

    # Clustering produk yang belum dilabel
    print(f"\n{C.CYAN}Mengelompokkan {len(belum_dilabel)} produk...{C.RESET}")
    clusters = cluster_produk(belum_dilabel)
    total_clusters = len(clusters)

    print(f"  Ditemukan {C.BOLD}{total_clusters} grup{C.RESET} produk serupa\n")
    input(f"  {C.DIM}Tekan Enter untuk mulai...{C.RESET}")

    # Loop per cluster
    quit_flag = False
    for cluster_no, products in clusters.items():
        if quit_flag:
            break

        clear()
        labeled_count = len([p for p in produk_unik if p in progress])
        print_header(labeled_count, len(produk_unik), cluster_no, total_clusters)
        print_cluster(cluster_no, products, nilai_map)
        print_menu()

        while True:
            choice = input(f"  {C.BOLD}Pilihan kamu: {C.RESET}").strip().lower()

            if choice == 'q':
                quit_flag = True
                break

            elif choice == 's':
                # Label satu per satu
                print(f"\n  {C.YELLOW}Mode individual — label satu per satu:{C.RESET}")
                for i, product in enumerate(products, 1):
                    if product in progress:
                        print(f"  {C.DIM}⏭ '{product}' sudah dilabel: {progress[product]}{C.RESET}")
                        continue

                    print_individual_menu(product, nilai_map.get(product, 0), i, len(products))

                    while True:
                        sub_choice = input(f"\n  {C.BOLD}Pilihan: {C.RESET}").strip().lower()
                        if sub_choice == 'q':
                            quit_flag = True
                            break
                        elif sub_choice == 's':
                            print(f"  {C.DIM}Dilewati.{C.RESET}")
                            break
                        elif sub_choice in KATEGORI_MAP:
                            progress[product] = KATEGORI_MAP[sub_choice]
                            save_progress(progress)
                            print(f"  {C.GREEN}✅ '{product}' → {KATEGORI_MAP[sub_choice]}{C.RESET}")
                            break
                        else:
                            print(f"  {C.RED}Pilihan tidak valid. Coba lagi.{C.RESET}")

                    if quit_flag:
                        break
                break

            elif choice in KATEGORI_MAP:
                # Label semua produk di cluster ini sekaligus
                kategori_terpilih = KATEGORI_MAP[choice]
                for product in products:
                    progress[product] = kategori_terpilih
                save_progress(progress)
                labeled_now = len(products)
                print(f"\n  {C.GREEN}✅ {labeled_now} produk dilabel sebagai '{kategori_terpilih}'{C.RESET}")
                input(f"  {C.DIM}Tekan Enter untuk lanjut...{C.RESET}")
                break

            else:
                print(f"  {C.RED}Pilihan tidak valid. Masukkan angka 1-9, 's', atau 'q'.{C.RESET}")

    # Simpan progress & output
    save_progress(progress)
    total_labeled = len([p for p in produk_unik if p in progress])
    sisa = len(produk_unik) - total_labeled

    clear()
    print(f"\n{C.BG_GREEN}{C.BOLD}  ✅ Sesi labeling selesai!  {C.RESET}")
    print(f"\n  Dilabel sesi ini : {C.BOLD}{total_labeled - len(sudah_dilabel)}{C.RESET} produk")
    print(f"  Total terlabel   : {C.GREEN}{total_labeled} / {len(produk_unik)}{C.RESET}")
    print(f"  Sisa belum label : {C.YELLOW}{sisa}{C.RESET}")

    if sisa == 0:
        print(f"\n  {C.GREEN}🎉 Semua produk sudah dilabel!{C.RESET}")
        save_output(df, progress, input_file)
    else:
        print(f"\n  {C.DIM}Progress disimpan ke '{PROGRESS_FILE}'.")
        print(f"  Jalankan ulang script ini untuk melanjutkan.{C.RESET}")
        save_output(df, progress, input_file)


def save_output(df: pd.DataFrame, progress: dict, input_file: str):
    """Terapkan label baru ke dataframe dan simpan."""
    df_out = df.copy()

    # Update kategori berdasarkan progress
    def update_kategori(row):
        if row['kategori'] == 'Lain-lain' and row['nama_produk'] in progress:
            return progress[row['nama_produk']]
        return row['kategori']

    df_out['kategori'] = df_out.apply(update_kategori, axis=1)
    df_out.to_csv(OUTPUT_FILE, index=False)

    print(f"\n  {C.CYAN}📁 Output disimpan ke: {C.BOLD}{OUTPUT_FILE}{C.RESET}")

    # Tampilkan distribusi baru
    print(f"\n  {C.BOLD}Distribusi kategori terbaru:{C.RESET}")
    dist = df_out['kategori'].value_counts()
    total = len(df_out)
    for kat, cnt in dist.items():
        pct = cnt / total * 100
        bar = '█' * int(pct / 3)
        print(f"    {kat:<30} {cnt:>4}  ({pct:5.1f}%)  {C.CYAN}{bar}{C.RESET}")


# ── Entry point ───────────────────────────────────────────────────────────────
if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Manual Labeling Tool untuk dataset pengeluaran')
    parser.add_argument(
        '--input', '-i',
        default='pengeluaran_clean.csv',
        help='Path ke file CSV input (default: pengeluaran_clean.csv)'
    )
    args = parser.parse_args()

    if not os.path.exists(args.input):
        print(f"\n{C.RED}❌ File '{args.input}' tidak ditemukan!{C.RESET}")
        print(f"  Pastikan file CSV ada di folder yang sama dengan script ini.\n")
    else:
        run_labeling(args.input)