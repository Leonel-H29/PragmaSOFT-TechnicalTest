export class Serie {
  id_serie?: number;
  titulo: string;
  descripcion: string;
  fecha_estreno: Date;
  estrellas: number;
  genero: string;
  precio_alquiler: number;
  ATP: boolean;
  estado: string;

  constructor(
    titulo: string,
    descripcion: string,
    fecha_estreno: Date,
    estrellas: number,
    genero: string,
    precio_alquiler: number,
    ATP: boolean,
    estado: string
  ) {
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.fecha_estreno = fecha_estreno;
    this.estrellas = estrellas;
    this.genero = genero;
    this.precio_alquiler = precio_alquiler;
    this.ATP = ATP;
    this.estado = estado;
  }
}
