"""Converte fotos da câmera para o padrão do site.

Lê as fotos de fotos-originais/ e grava em imagens/ como .webp:
- qualidade 80;
- no máximo 1280 px de largura (use --largura 1600 para a foto do topo);
- gira a foto conforme a orientação da câmera;
- SEM metadados EXIF (inclusive a localização GPS).
Os originais não são apagados nem alterados.

Uso: python3 ferramentas/converter-fotos.py [--largura 1280] [--sobrescrever]
Precisa do Pillow: pip install pillow
"""
import argparse
from pathlib import Path

from PIL import Image, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
ORIGEM = RAIZ / 'fotos-originais'
DESTINO = RAIZ / 'imagens'
EXTENSOES = {'.jpg', '.jpeg', '.png', '.webp'}


def nome_limpo(nome):
    """'Sala do Maternal (2).JPG' -> 'sala-do-maternal-2'"""
    import unicodedata
    sem_acento = unicodedata.normalize('NFKD', nome).encode('ascii', 'ignore').decode()
    partes = ''.join(c if c.isalnum() else '-' for c in sem_acento.lower()).split('-')
    return '-'.join(p for p in partes if p)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--largura', type=int, default=1280)
    ap.add_argument('--sobrescrever', action='store_true')
    args = ap.parse_args()
    if not ORIGEM.is_dir():
        raise SystemExit(f'Pasta não encontrada: {ORIGEM}')
    for foto in sorted(ORIGEM.iterdir()):
        if foto.suffix.lower() not in EXTENSOES:
            continue
        saida = DESTINO / (nome_limpo(foto.stem) + '.webp')
        if saida.exists() and not args.sobrescrever:
            print(f'pulei (já existe): {saida.name}')
            continue
        with Image.open(foto) as im:
            im = ImageOps.exif_transpose(im).convert('RGB')
            if im.width > args.largura:
                im = im.resize((args.largura, round(im.height * args.largura / im.width)), Image.LANCZOS)
            # Sem exif=: o webp sai sem metadados (nada de GPS).
            im.save(saida, 'WEBP', quality=80, method=6)
        print(f'{foto.name} -> imagens/{saida.name} ({im.width}x{im.height}, {saida.stat().st_size // 1024} KB)')


if __name__ == '__main__':
    main()
