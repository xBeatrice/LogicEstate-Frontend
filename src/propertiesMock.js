const propertiesData = [
  {
    id: 1,
    title: "Property 1",
    images: [
      "https://img.freepik.com/free-photo/modern-living-room-style_53876-144814.jpg?w=740&t=st=1690787469~exp=1690788069~hmac=8d4f2f1895bb3c1a8a5ad395d9f3023e28198a5433b90275277658f9850d14c7",
      "https://img.freepik.com/free-photo/modern-apartment-bedroom-comfortable-bed-near-window-generative-ai_188544-7709.jpg?w=826&t=st=1690787929~exp=1690788529~hmac=e82f1225790fed90b6b8146b4fadbebcdc44d7d27bd00e48ba5abd3b33ca4c60",
    ],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    coordinates: { lat: 44.4266, lng: 26.1066 }, // Coordinates for Bucharest, Romania
    city: "Bucuresti, sector 1",
    price: 150000, // Example price in USD
    constructionYear: 2010,
    floor: 3,
    numberOfRooms: 2,
    surfaceSquareMeters: 100,
  },
  {
    id: 2,
    title: "Property 2",
    images: [
      "https://img.freepik.com/free-photo/bangkok-thailand-august-12-2016-beautiful-luxury-living-room_1203-2867.jpg?w=740&t=st=1690787497~exp=1690788097~hmac=c7821752cab00f42bb0159a7112f586bf4908927dacc6680f679ff06b499d755",
      "https://img.freepik.com/free-psd/realistic-modern-double-bedroom-with-furniture-frame_176382-411.jpg?w=826&t=st=1690787980~exp=1690788580~hmac=12173c18a29a35923949eb07a658484830be4ac0c949ff429611550e422fe8a4",
    ],
    description: "Vestibulum ac consectetur quam, vel scelerisque leo.",
    coordinates: { lat: 44.4268, lng: 26.1025 }, // Coordinates for Bucharest, Romania
    city: "Bucuresti, sector 2",
    price: 200000, // Example price in USD
    constructionYear: 2015,
    floor: 5,
    numberOfRooms: 4,
    surfaceSquareMeters: 120,
  },
  {
    id: 3,
    title: "Property 3",
    images: [
      "https://img.freepik.com/free-photo/stylish-scandinavian-living-room-with-design-mint-sofa-furnitures-mock-up-poster-map-plants-eleg_1258-152155.jpg?w=900&t=st=1690787520~exp=1690788120~hmac=2d44a08bc1a48c9b6ffd03930b8955d2edc64c74f0ce6d641ec8bcd0d56f858c",
      "https://img.freepik.com/free-photo/luxury-classic-modern-bedroom-suite-hotel_105762-1787.jpg?w=740&t=st=1690788089~exp=1690788689~hmac=5f4bfcd5df2de8fa2f8dd0dfaf8d2d9eef7f2baa69c92b447e353fa55dd8d789",
    ],
    description: "Aenean euismod turpis non finibus ultrices.",
    coordinates: { lat: 44.422, lng: 26.1022 }, // Coordinates for Bucharest, Romania
    city: "Bucuresti, sector 3",
    price: 180000, // Example price in USD
    constructionYear: 2005,
    floor: 1,
    numberOfRooms: 4,
    surfaceSquareMeters: 75,
  },
  {
    id: 4,
    title: "Property 4",
    images: [
      "https://img.freepik.com/free-photo/empty-flat-interrior-with-elements-decoration_1303-23910.jpg?w=740&t=st=1690787539~exp=1690788139~hmac=e61a1048a3a13daaf9bc48441dc25cdec88983c8cc01545711117f02a080f3b7",
      "https://img.freepik.com/free-photo/bedroom-interior_1098-15128.jpg?w=740&t=st=1690788114~exp=1690788714~hmac=457d596c34a9636ef2f68bce1d4313f2ace7c888e880913e60ceb1f086444a73",
    ],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    coordinates: { lat: 44.4264, lng: 26.1046 }, // Coordinates for Bucharest, Romania
    city: "Bucuresti, sector 4",
    price: 150000, // Example price in USD
    constructionYear: 2015,
    floor: 5,
    numberOfRooms: 3,
    surfaceSquareMeters: 120,
  },
  {
    id: 5,
    title: "Property 5",
    images: [
      "https://img.freepik.com/free-photo/3d-rendering-modern-dining-room-living-room-with-luxury-decor_105762-2189.jpg?w=740&t=st=1690787559~exp=1690788159~hmac=d17552b6d8713b004112dcfabf819b8ea4fd99cb1fe4461a65905fd9b59ef5df",
      "https://img.freepik.com/free-photo/modern-bedroom-interior-blue-yellow-tones_169016-6265.jpg?w=740&t=st=1690788172~exp=1690788772~hmac=4057d414fb86a01d1f8d9f13f56cfe1173ed26009f42264504c2b0f2b16c6865",
    ],
    description: "Vestibulum ac consectetur quam, vel scelerisque leo.",
    coordinates: { lat: 44.4211, lng: 26.1021 }, // Coordinates for Bucharest, Romania
    city: "Bucuresti, sector 5",
    price: 200000, // Example price in USD
    constructionYear: 2005,
    floor: 1,
    numberOfRooms: 1,
    surfaceSquareMeters: 75,
  },
  {
    id: 6,
    title: "Property 6",
    images: [
      "https://img.freepik.com/premium-photo/modern-mid-century-living-kichen-room-interior_33739-469.jpg?w=826",
      "https://img.freepik.com/free-photo/high-angle-shot-bedroom-with-interior-stuff-beige-tones_181624-33128.jpg?w=740&t=st=1690788227~exp=1690788827~hmac=8e3214b7ad169d4d26cf3ace27d6265aa47d43c54f9cd3f2af9ca1648e5f552f",
    ],
    description: "Aenean euismod turpis non finibus ultrices.",
    coordinates: { lat: 44.4, lng: 26.1023 }, // Coordinates for Bucharest, Romania
    city: "Bucuresti, sector 6",
    price: 180000, // Example price in USD
    constructionYear: 2005,
    floor: 1,
    numberOfRooms: 1,
    surfaceSquareMeters: 75,
  },
  {
    id: 7,
    title: "Property 7",
    images: [
      "https://img.freepik.com/free-photo/3d-rendering-modern-dining-room-living-room-with-luxury-decor-yellow-lamp_105762-2232.jpg?w=740&t=st=1690787591~exp=1690788191~hmac=8a4dd056c1b089c9be101f2ec22a603371eaabb4f0d58a2311d7618e6840c88c",
      "https://img.freepik.com/free-photo/small-hotel-bedroom-with-white-walls-panoramic-window_1262-12488.jpg?w=740&t=st=1690788284~exp=1690788884~hmac=cda416d37545cf411997d5e2bcba377164801e9606b68b744b58f3b8075a7d49",
    ],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    coordinates: { lat: 44.4299, lng: 26.1099 }, // Coordinates for Bucharest, Romania
    city: "Bucuresti, sector 1",
    price: 150000, // Example price in USD
    constructionYear: 2015,
    floor: 5,
    numberOfRooms: 3,
    surfaceSquareMeters: 120,
  },
  {
    id: 8,
    title: "Property 8",
    images: [
      "https://img.freepik.com/premium-photo/green-sofa-modern-apartment-interior-with-empty-wall-wooden-table-3d-rendering_41470-3760.jpg?w=740",
      "https://img.freepik.com/free-photo/3d-rendering-beautiful-luxury-bedroom-suite-hotel-with-tv_105762-2149.jpg?w=740&t=st=1690787873~exp=1690788473~hmac=8410d9d454e734a3cc3e173635a6747abdbf6d28e533135fa013c472e29febd2",
    ],
    description: "Vestibulum ac consectetur quam, vel scelerisque leo.",
    coordinates: { lat: 44.42, lng: 26.1 }, // Coordinates for Bucharest, Romania
    city: "Bucuresti, sector 2",
    price: 200000, // Example price in USD
    constructionYear: 2005,
    floor: 1,
    numberOfRooms: 1,
    surfaceSquareMeters: 75,
  },
  {
    id: 9,
    title: "Property 9",
    images: [
      "https://img.freepik.com/free-photo/3d-rendering-mock-up-wood-decor-living-room-with-sofa-classic-style_105762-2198.jpg?w=740&t=st=1690787627~exp=1690788227~hmac=aeff910d4eb6dc7442e9dc2d44fea810b19910ff6eb9e686f4888a975fe3ca74",
      "https://img.freepik.com/free-photo/3d-contemporary-bedroom-interior_1048-10250.jpg?w=826&t=st=1690788327~exp=1690788927~hmac=7eb081f600aa57c71a6c699ca310406da3bea9b37c8b679e74ea675872afd0c7",
    ],
    description: "Aenean euismod turpis non finibus ultrices.",
    coordinates: { lat: 44.461, lng: 26.1012 }, // Coordinates for Bucharest, Romania
    city: "Bucuresti, sector 3",
    price: 180000, // Example price in USD
    constructionYear: 2015,
    floor: 5,
    numberOfRooms: 3,
    surfaceSquareMeters: 120,
  },
];

export default propertiesData;
