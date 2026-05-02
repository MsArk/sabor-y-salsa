export type CartaDish = {
  name: string;
  description: string;
  price: string;
};

/** Cada entrada del array = un slide del carrusel (grupo de platos). */
export const entrantesSlides: CartaDish[][] = [
  [
    {
      name: "Tequeños",
      description: "Crujientes palitos rellenos de queso fundido.",
      price: "12 €",
    },
    {
      name: "Yuca frita",
      description: "Yuca dorada con salsa huancaina.",
      price: "12 €",
    },
    {
      name: "Porción de alitas",
      description: "Alitas fritas con patatas fritas.",
      price: "15 €",
    },
    {
      name: "Causa limeña",
      description: "Papa amarilla con aji amarillo y relleno de pollo.",
      price: "15 €",
    },
    {
      name: "Salchipapas",
      description: "Patatas fritas con hot dogs y salsas.",
      price: "10 €",
    },
  ],
  [
    {
      name: "Porción de patatas",
      description: "Patatas fritas.",
      price: "7 €",
    },
    {
      name: "Porción de arroz",
      description: "Arroz blanco.",
      price: "5 €",
    },
    {
      name: "Torreznos",
      description: "Desde Soria a tu estómago.",
      price: "12,5 €",
    },
    {
      name: "Croquetas",
      description: "Con toque ibérico.",
      price: "13 €",
    },
    {
      name: "Anticuchos",
      description:
        "Anticuchos de ternera, acompañados con crema a la Huancaina.",
      price: "15 €",
    },
  ],
];

export const calientesSlides: CartaDish[][] = [
  [
    {
      name: "Lomo Saltado",
      description: "Wok a fuego extremadamente alto (punto de humo).",
      price: "22 €",
    },
    {
      name: "Chaufa de Pollo",
      description: "Delicioso arroz fusión peruana-oriental.",
      price: "18 €",
    },
    {
      name: "Chaufa de Carne",
      description: "Delicioso arroz fusión peruana-oriental.",
      price: "20 €",
    },
    {
      name: "Chaufa de Marisco",
      description: "Fusión peruana-oriental. Con sabor peruano.",
      price: "25 €",
    },
    {
      name: "Arroz con Marisco",
      description: "Tipico arroz peruano con mixtura de marisco.",
      price: "25 €",
    },
  ],
  [
    {
      name: "Duo Marino",
      description: "Cheviche de pescado y con chicharron de pescado.",
      price: "25 €",
    },
    {
      name: "Trio Marino",
      description: "Tres deliciosas versiones de nuestro mar.",
      price: "35 €",
    },
    {
      name: "Parrilla",
      description:
        "Nuestra típica parrilla con mixturas pollo, chuletas de cerdo, filetes de ternera, anticuchos y patatas a la parrilla.",
      price: "40 €",
    },
    {
      name: "Jalea personal",
      description:
        "Crocantes trozos de pescado con yuquitas fritas y nuestra deciciosa salsa criolla de cebolla.",
      price: "25 €",
    },
    {
      name: "Jalea mixta personal",
      description:
        "Crocantes trozos de pescado, aros de calamar y camarones empanizados con yuquitas fritas y su nuestra deciciosa salsa criolla de cebolla.",
      price: "28 €",
    },
  ],
  [
    {
      name: "Jalea mixta familiar",
      description:
        "Crocantes trozos de pescado, aros de calamar y camarones empanizados con yuquitas fritas y su nuestra deciciosa salsa criolla de cebolla.",
      price: "80 €",
    },
    {
      name: "Jalea familiar",
      description:
        "Crocantes trozos de pescado con yuquitas fritas y nuestra deciciosa salsa criolla de cebolla.",
      price: "77,5 €",
    },
    {
      name: "Mostrito",
      description: "Cuarto de pollo a la brasa, patatas fritas y su rico chaufa.",
      price: "20 €",
    },
    {
      name: "Pollada peruana",
      description:
        "Deliciosa pollada acompañada de sus patatas a la parrilla, ensalda y cremas.",
      price: "20 €",
    },
    {
      name: "Pollo broster",
      description:
        "Crujiente pollo broster, acompañada de patatas fritas, ensalda y cremas.",
      price: "20 €",
    },
  ],
  [
    {
      name: "Entrecot",
      description:
        "Delicioso entrocot acompañado de patatas a la parilla y cremas.",
      price: "20 €",
    },
  ],
];
