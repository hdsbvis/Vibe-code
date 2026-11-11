// General-knowledge prompts for the Space world.
//
// Each line of `a` is one of:
//   Name|share%|alias,alias          one answer
//   share%|Name/alias;Name/alias     many answers that share one share
// "share" is a hand estimate of how many players out of 100 give that answer.

export default [
  {
    id: "red-inside",
    q: "Name a fruit or vegetable that's red on the inside",
    a: `
Tomato|30|cherry tomato,roma tomato
Watermelon|22|
Strawberry|12|
Beet|8|beetroot
Raspberry|5|
Cherry|5|cherries
Pomegranate|4|
Red bell pepper|3|red pepper,bell pepper,pepper,capsicum
Blood orange|2|moro orange
Grapefruit|2|pink grapefruit,ruby grapefruit
Plum|1.5|blood plum
Dragon fruit|1.2|pitaya,pitahaya,red dragon fruit
Guava|1|pink guava
Red cabbage|0.8|
Cranberry|0.8|
Chili pepper|0.6|chili,chilli,red chili,red chilli
Fig|0.5|
Papaya|0.5|
Mulberry|0.3|
Red currant|0.3|redcurrant
Prickly pear|0.2|cactus fruit,cactus pear
Cara cara orange|0.15|cara cara
Goji berry|0.15|goji,wolfberry
Red-fleshed apple|0.1|red fleshed apple,pink pearl apple
Lingonberry|0.1|
Radicchio|0.1|
Watermelon radish|0.05|
Tamarillo|0.05|tree tomato
Acerola|0.05|barbados cherry
Blood lime|0.02|
Cornelian cherry|0.02|
0.2|Rhubarb
0.05|Strawberry guava/cattley guava;Red pomelo/pomelo;Pimiento/pimento;Paprika;Pluot;Sour cherry/morello cherry;Wild strawberry;Rose hip/rosehip;Red kiwi/red kiwifruit/hongyang kiwi
0.02|Pink pineapple/pinkglow pineapple/rose pineapple;Blood peach/vine peach/peche de vigne;Barberry;Surinam cherry/pitanga;Tarocco orange/tarocco;Sanguinello;Red guava
0.01|Davidson plum;Salmonberry;Thimbleberry;Red carrot;Red mustard greens
`,
  },
  {
    id: "moons",
    q: "Name a moon in our solar system",
    a: `
The Moon|40|moon,luna,earth's moon,our moon
Titan|12|
Europa|10|
Io|8|
Ganymede|7|
Phobos|5|
Callisto|4|
Enceladus|4|
Deimos|3|
Triton|3|
Charon|2|
Miranda|1|
Mimas|0.6|
Titania|0.4|
Oberon|0.4|
Rhea|0.3|
Iapetus|0.3|
Dione|0.3|
Ariel|0.3|
Tethys|0.2|
Hyperion|0.2|
Umbriel|0.15|
Phoebe|0.1|
Amalthea|0.1|
Proteus|0.1|
Nereid|0.08|
Pan|0.06|
Puck|0.06|
Janus|0.05|
Pandora|0.05|
Prometheus|0.04|
Epimetheus|0.04|
Metis|0.03|
Thebe|0.03|
Nix|0.03|
Hydra|0.03|
Kerberos|0.02|
Styx|0.02|
Cordelia|0.02|
Dactyl|0.02|
Dysnomia|0.02|
Hi'iaka|0.01|hiiaka
Halimede|0.01|
0.03|Dimorphos;Larissa;Galatea;Despina;Thalassa;Naiad;Atlas;Daphnis;Calypso;Telesto;Helene;Himalia;Elara;Pasiphae;Sinope;Adrastea;Bianca;Cressida;Desdemona;Juliet;Portia;Rosalind;Belinda;Perdita;Mab;Cupid;Caliban;Sycorax;Prospero;Setebos;Namaka;Vanth;Weywot;Xiangliu
0.01|Polydeuces;Methone;Pallene;Anthe;Aegaeon;Ymir;Paaliaq;Siarnaq;Tarvos;Kiviuq;Ijiraq;Albiorix;Skathi;Mundilfari;Suttungr;Thrymr;Narvi;Bebhionn;Bergelmir;Fenrir;Fornjot;Hati;Loge;Surtur;Kari;Greip;Jarnsaxa;Tarqeq;Hyrrokkin;Aegir;Bestla;Erriapus;Farbauti;Lysithea;Carme;Ananke;Leda;Callirrhoe;Themisto;Megaclite;Taygete;Chaldene;Harpalyke;Kalyke;Iocaste;Erinome;Isonoe;Praxidike;Autonoe;Thyone;Hermippe;Aitne;Eurydome;Euanthe;Euporie;Orthosie;Sponde;Kale;Pasithee;Hegemone;Mneme;Aoede;Thelxinoe;Arche;Kallichore;Helike;Carpo;Eukelade;Cyllene;Kore;Herse;Dia;Valetudo;Ersa;Pandia;Stephano;Trinculo;Francisco;Margaret;Ferdinand;Sao;Psamathe;Laomedeia;Neso;Hippocamp
`,
  },
  {
    id: "australia",
    q: "Name an animal that lives in Australia",
    a: `
Kangaroo|35|roo
Koala|25|koala bear
Emu|6|
Platypus|6|duck-billed platypus
Wombat|5|
Dingo|3|
Tasmanian devil|3|
Wallaby|3|
Kookaburra|2|
Echidna|2|spiny anteater
Saltwater crocodile|2|crocodile,croc,saltie
Quokka|2|
Cassowary|1|
Cockatoo|1|sulphur-crested cockatoo
Possum|0.6|brushtail possum
Box jellyfish|0.5|
Funnel-web spider|0.5|funnel web,sydney funnel-web
Sugar glider|0.5|
Frilled lizard|0.5|frill-necked lizard
Taipan|0.4|inland taipan
Bilby|0.4|
Great white shark|0.4|
Galah|0.3|
Lyrebird|0.3|
Thorny devil|0.3|
Numbat|0.3|
Quoll|0.3|
Dugong|0.3|
Bandicoot|0.2|
Blue-ringed octopus|0.1|
Tree kangaroo|0.1|
Pademelon|0.05|
Tawny frogmouth|0.03|
Potoroo|0.03|
Cuscus|0.03|
Bettong|0.02|
Brolga|0.02|
Wobbegong|0.02|
Kowari|0.01|
0.4|Redback spider/redback/redback widow
0.3|Huntsman spider/huntsman;Brown snake/eastern brown snake;Magpie/australian magpie
0.2|Goanna/monitor lizard/lace monitor;Bearded dragon/beardie;Cane toad;Ibis/bin chicken/white ibis/australian white ibis
0.15|Rainbow lorikeet/lorikeet;Budgerigar/budgie;Flying fox/fruit bat
0.1|Tiger snake;Blue-tongued lizard/bluetongue/blue tongue skink/blue tongue lizard;Black swan;Little penguin/fairy penguin;Feral camel/camel;Blue-ringed octopus/blue ringed octopus;Stonefish
0.05|Death adder;Red-bellied black snake/black snake;Carpet python/python;Pelican/australian pelican;Wedge-tailed eagle/wedgie;Rosella;Freshwater crocodile/freshie;Sea turtle/green turtle/loggerhead turtle;Humpback whale;Bull ant/bulldog ant;Clownfish/nemo;Green tree frog;Wallaroo/euro
0.03|Bowerbird/satin bowerbird;Brush turkey/bush turkey/australian brushturkey;Whale shark;Bull shark;Tiger shark;Irukandji/irukandji jellyfish;Barramundi;Witchetty grub;Sulphur-crested cockatoo
0.02|Perentie;Shingleback;Water dragon;Willie wagtail;Superb fairywren/fairy wren;Currawong;Brumby/wild horse;Greater glider;Grey nurse shark;Australian sea lion/sea lion;Fur seal/australian fur seal;Murray cod;Lungfish/queensland lungfish;Weedy seadragon/leafy seadragon/sea dragon;Peacock spider;Trapdoor spider;Black cockatoo
0.01|Corroboree frog;Ghost bat;Marsupial mole;Antechinus;Dunnart;Feathertail glider;Hopping mouse;Mountain pygmy possum;Malleefowl;Jabiru;Honeypot ant;Christmas beetle;Golden orb weaver;Mouse spider;Plains-wanderer;Gouldian finch;Rufous bettong
`,
  },
  {
    id: "pizza",
    q: "Name a pizza topping",
    a: `
Pepperoni|35|
Mushroom|12|
Pineapple|8|
Sausage|7|italian sausage
Ham|5|
Onion|5|red onion
Olive|5|black olive
Bell pepper|5|pepper,green pepper,peppers
Mozzarella|3|cheese,extra cheese
Bacon|4|
Spinach|2|
Anchovy|2|anchovies
Jalapeño|2|jalapeno
Chicken|2|bbq chicken
Tomato|1.5|
Basil|1.5|
Salami|1|
Garlic|0.8|
Artichoke|0.8|artichoke hearts
Corn|0.5|sweetcorn
Prosciutto|0.5|parma ham
Ground beef|0.5|beef,mince
Arugula|0.4|rocket
Feta|0.4|
Egg|0.4|
Ricotta|0.3|
Broccoli|0.3|
Shrimp|0.3|prawn
Eggplant|0.3|aubergine
Pesto|0.3|
Sun-dried tomato|0.3|sundried tomato
Goat cheese|0.3|chevre
Gorgonzola|0.2|blue cheese
Potato|0.2|
Truffle|0.2|truffle oil
Capers|0.2|caper
Tuna|0.2|
Fig|0.15|
Hot honey|0.15|honey
Burrata|0.15|
Nduja|0.1|'nduja
Pear|0.05|
Clams|0.05|clam
Kimchi|0.03|
Pistachio|0.03|
Banana|0.03|
Speck|0.03|
Calamari|0.03|squid
Squash blossom|0.02|zucchini flower,courgette flower
Duck|0.02|
0.2|Meatballs/meatball;Canadian bacon;Red pepper flakes/chili flakes/crushed red pepper
0.15|Parmesan/parmigiano
0.1|Chorizo;Roasted red pepper;Oregano
0.05|Pepperoncini;Caramelized onion;Green olive;Cheddar;Pancetta;Pulled pork;Zucchini/courgette;BBQ sauce/barbecue sauce;Buffalo chicken/buffalo
0.03|Provolone;Mortadella;Soppressata;Steak/cheesesteak;Smoked salmon/salmon;Ranch;Shiitake
0.02|Pecorino;Fontina;Brie;Gouda;Capicola/capocollo/coppa;Hot dog;Lamb;Avocado;Kale;Asparagus;Butternut squash;Paneer;Balsamic glaze/balsamic;Pickles/pickle;Scallions/green onion/spring onion;Fries/french fries;Hot sauce
0.01|Taleggio;Mussels;Crab;Lobster;Mango;Apple;Peach;Grapes;Cauliflower;Brussels sprouts;Peas;Sweet potato;Pumpkin;Fennel;Mac and cheese;Sauerkraut;Tofu;Sriracha;Pine nuts;Walnuts;Chocolate;Nutella;Spam;Sardines;Bulgogi;Chives;Cilantro/coriander;Parsley;Rosemary
0.005|Marshmallow;Caviar;Quail egg;Seaweed;Gochujang;Mint
`,
  },
  {
    id: "breakfast",
    q: "Name a breakfast food",
    a: `
Eggs|20|egg,scrambled eggs,fried eggs,fried egg,boiled egg
Pancakes|15|hotcakes,flapjacks
Bacon|12|
Cereal|10|
Toast|8|
Waffles|6|
Oatmeal|5|porridge,oats
French toast|4|
Yogurt|3|yoghurt
Bagel|3|
Croissant|2|
Sausage|2|
Hash browns|2|hashbrown,hash brown
Omelette|2|omelet
Muffin|1|
Granola|1|
Avocado toast|1|
Eggs Benedict|0.8|eggs benny
Crêpes|0.6|crepe
Fruit|0.5|
Smoothie|0.5|
Donut|0.5|doughnut
Breakfast burrito|0.5|burrito
Muesli|0.4|
Grits|0.4|
Biscuits and gravy|0.4|biscuits,biscuit
Shakshuka|0.3|shakshouka
Full English|0.3|english breakfast,fry up
Congee|0.2|rice porridge,jook
Cinnamon roll|0.2|
Huevos rancheros|0.2|
Quiche|0.1|
Chilaquiles|0.1|
Açaí bowl|0.1|acai bowl
Pain au chocolat|0.1|
Dosa|0.08|
Idli|0.06|
Black pudding|0.05|
Frittata|0.05|
Natto|0.05|
Poha|0.05|
Kedgeree|0.03|
Kippers|0.03|kipper
Arepa|0.03|
Paratha|0.03|
Tamagoyaki|0.02|
Menemen|0.01|
Gallo pinto|0.01|
Ful medames|0.01|ful,foul medames
Scrapple|0.01|
0.1|Breakfast sandwich/egg mcmuffin/mcmuffin;English muffin;Pop-Tarts/pop tart;Banana
0.05|Cheerios;Lox/bagel and lox;Bacon egg and cheese;Danish/danish pastry;Scone;Banana bread;Beans on toast/baked beans;Overnight oats;Breakfast tacos/breakfast taco;Smoothie bowl
0.03|Corned beef hash;Steak and eggs;Coffee cake;Crumpet;Weetabix;Leftover pizza/cold pizza;Ham;Granola bar;Home fries
0.02|Chia pudding;Cottage cheese;Churros;Bacon butty/bacon sandwich;Sausage roll;Marmite toast/marmite/vegemite;Peanut butter toast;Jam;Brioche;Baguette;Fruit loops;Miso soup;Dim sum;Cinnamon toast
0.01|Dutch baby;Blintzes/blintz;Latkes/latke;Kolache;Pan con tomate/pan tumaca;Tortilla espanola/spanish omelette;Migas;Tamales/tamale;Johnny cakes/johnnycake;Pao de queijo/cheese bread;Bubble and squeak;Rosti/roesti;Croque madame;Turkish breakfast;Halloumi;Upma;Youtiao/chinese doughnut;Baozi/bao/steamed bun;Onigiri;Pho;Banh mi;Spam and eggs/spam;Loco moco;Skyr;Shrimp and grits;Breakfast casserole;Tater tots;Grilled fish;Honey;Nutella;Rice
0.005|Molletes;Conchas/pan dulce;Mangu;Ackee and saltfish/ackee;Cachapa;Medialunas;Haggis;Tartine;Syrniki/sirniki;Blini;Kasha;Simit;Labneh;Manakish/manakeesh;Chole bhature;Puri;Uttapam;Vada;Pongal;Jianbing;Kaya toast;Nasi lemak;Roti canai;Bubur ayam;Tapsilog/silog;Pandesal;Malasada;Strata
`,
  },
  {
    id: "instruments",
    q: "Name a musical instrument",
    a: `
Guitar|30|electric guitar,acoustic guitar
Piano|25|keyboard
Drums|12|drum,drum kit,drum set
Violin|10|fiddle
Flute|5|
Trumpet|4|
Saxophone|3|sax
Cello|2|
Clarinet|1.5|
Harp|1|
Bass|1|bass guitar,electric bass,double bass
Ukulele|1|uke
Trombone|0.8|
Harmonica|0.5|
Accordion|0.5|
Banjo|0.5|
Tuba|0.4|
Organ|0.4|
Recorder|0.4|
Xylophone|0.4|
Triangle|0.3|
Bagpipes|0.3|bagpipe
French horn|0.3|horn
Oboe|0.3|
Synthesizer|0.3|synth
Viola|0.3|
Bassoon|0.2|
Didgeridoo|0.2|
Sitar|0.2|
Mandolin|0.2|
Kazoo|0.2|
Tambourine|0.2|
Theremin|0.1|
Harpsichord|0.1|
Steel drum|0.1|steelpan,steel pan
Marimba|0.1|
Glockenspiel|0.1|
Lute|0.1|
Cowbell|0.1|
Hurdy-gurdy|0.05|
Koto|0.05|
Oud|0.05|
Keytar|0.05|
Erhu|0.03|
Kalimba|0.05|thumb piano
Hang drum|0.02|handpan
Ondes Martenot|0.005|
Nyckelharpa|0.005|
0.1|Piccolo
0.05|Snare drum;Cymbals/cymbal;Bongos/bongo;Maracas/maraca;Pan flute/panpipes/pan pipes;Ocarina;Bugle;Timpani/kettle drum;Vibraphone/vibes
0.03|Cornet;Euphonium;Sousaphone;Djembe;Congas/conga;Cajon;Gong
0.02|Flugelhorn;English horn/cor anglais;Tin whistle/penny whistle;Melodica;Tabla;Castanets;Lyre;Bass drum
0.01|Bass clarinet;Baritone horn;Mellophone;Fife;Shakuhachi;Concertina;Harmonium;Celesta;Drum machine;Turntables/turntable;Balalaika;Taiko;Dhol;Washboard;Jaw harp/jews harp/mouth harp;Steel guitar/pedal steel/lap steel;Zither;Dulcimer/hammered dulcimer/appalachian dulcimer;Autoharp;Handbells/bells;Tubular bells/chimes/wind chimes;Vuvuzela
0.005|Contrabassoon;Bansuri;Duduk;Bandoneon;Clavichord;Mellotron;Sampler;Bouzouki;Charango;Shamisen;Pipa;Guzheng;Spoons;Kora;Dobro/resonator guitar;Musical saw/saw;Conch shell/conch;Alphorn/alpenhorn;Claves;Guiro
0.002|Sarod;Veena;Balafon;Hardanger fiddle;Viola da gamba;Cimbalom;Glass harmonica;Uilleann pipes;Sackbut;Serpent;Crumhorn;Shawm;Theorbo
`,
  },
  {
    id: "europe",
    q: "Name a country in Europe",
    a: `
France|22|
Germany|18|deutschland
Italy|13|italia
Spain|12|espana
United Kingdom|8|uk,england,britain,great britain
Portugal|3|
Greece|3|hellas
Netherlands|3|holland,nederland
Switzerland|2.5|schweiz,suisse
Poland|2|polska
Sweden|2|sverige
Norway|1.5|norge
Ireland|1.5|eire
Belgium|1.2|belgie,belgique
Austria|1|osterreich
Denmark|1|
Russia|1|
Ukraine|0.8|
Finland|0.6|suomi
Czechia|0.6|czech republic,cesko
Hungary|0.5|magyarorszag
Croatia|0.5|hrvatska
Iceland|0.5|
Romania|0.4|
Scotland|0.3|
Luxembourg|0.3|
Turkey|0.3|turkiye
Wales|0.2|
Monaco|0.2|
Bulgaria|0.2|
Serbia|0.2|
Slovakia|0.15|
Slovenia|0.15|
Estonia|0.15|
Malta|0.15|
Latvia|0.1|
Lithuania|0.1|
Liechtenstein|0.1|
Andorra|0.1|
Vatican City|0.1|vatican,holy see
Albania|0.1|
Belarus|0.1|
Cyprus|0.1|
San Marino|0.08|
Moldova|0.05|
Montenegro|0.05|
North Macedonia|0.05|macedonia
Bosnia and Herzegovina|0.05|bosnia
Kosovo|0.04|
0.05|Northern Ireland
0.02|Georgia;Armenia;Azerbaijan
0.01|Kazakhstan
`,
  },
  {
    id: "scientists",
    q: "Name a famous scientist",
    a: `
Albert Einstein|40|einstein
Isaac Newton|18|newton
Marie Curie|6|curie,madame curie
Charles Darwin|6|darwin
Nikola Tesla|5|tesla
Galileo Galilei|5|galileo
Stephen Hawking|5|hawking
Thomas Edison|2|edison
Richard Feynman|0.8|feynman
Nicolaus Copernicus|0.7|copernicus
J. Robert Oppenheimer|0.6|oppenheimer,robert oppenheimer
Carl Sagan|0.5|sagan
Louis Pasteur|0.5|pasteur
Niels Bohr|0.5|bohr
Johannes Kepler|0.5|kepler
Neil deGrasse Tyson|0.4|degrasse tyson
Benjamin Franklin|0.4|ben franklin
Archimedes|0.4|
Alan Turing|0.4|turing
Erwin Schrödinger|0.4|schrodinger,schroedinger
Michael Faraday|0.4|faraday
Gregor Mendel|0.3|mendel
Ada Lovelace|0.3|lovelace
Rosalind Franklin|0.3|
Aristotle|0.3|
Werner Heisenberg|0.3|heisenberg
Leonardo da Vinci|0.3|da vinci,leonardo
Jane Goodall|0.2|goodall
Max Planck|0.2|planck
James Clerk Maxwell|0.2|maxwell
Edwin Hubble|0.2|hubble
Alexander Fleming|0.2|fleming
Dmitri Mendeleev|0.2|mendeleev
Bill Nye|0.2|
Pythagoras|0.15|
Leonhard Euler|0.08|euler
Carl Friedrich Gauss|0.08|gauss
James Watson|0.08|watson
Francis Crick|0.08|crick
Ernest Rutherford|0.08|rutherford
Enrico Fermi|0.06|fermi
Euclid|0.05|
Robert Hooke|0.05|hooke
Robert Boyle|0.05|boyle
Antoine Lavoisier|0.05|lavoisier
Linus Pauling|0.05|pauling
Katherine Johnson|0.05|
Paul Dirac|0.04|dirac
Srinivasa Ramanujan|0.04|ramanujan
Tycho Brahe|0.04|tycho,brahe
Lise Meitner|0.03|meitner
Emmy Noether|0.03|noether
Vera Rubin|0.03|
Hypatia|0.03|
Barbara McClintock|0.02|mcclintock
Chien-Shiung Wu|0.02|
Ibn al-Haytham|0.02|alhazen
Henrietta Leavitt|0.01|leavitt
Cecilia Payne-Gaposchkin|0.01|cecilia payne
Subrahmanyan Chandrasekhar|0.01|chandrasekhar
0.1|Sigmund Freud/freud;Alexander Graham Bell/graham bell
0.05|Ivan Pavlov/pavlov;Jonas Salk/salk;George Washington Carver/carver;Peter Higgs/higgs;Brian Cox;Michio Kaku/kaku;Richard Dawkins/dawkins;Alfred Nobel/nobel;Blaise Pascal/pascal;Rene Descartes/descartes
0.03|James Watt/watt;Alessandro Volta/volta;Gottfried Leibniz/leibniz;Pierre Curie
0.02|Florence Nightingale/nightingale;Guglielmo Marconi/marconi;Andre-Marie Ampere/ampere;Lord Kelvin/kelvin/william thomson;John Dalton/dalton;J. J. Thomson/jj thomson;Wilhelm Rontgen/roentgen/rontgen;Rachel Carson;Sally Ride;Carl Linnaeus/linnaeus;Hippocrates;Ptolemy;Edmond Halley/halley;John von Neumann/von neumann;Grace Hopper;Tim Berners-Lee/berners lee;Wernher von Braun/von braun;Carl Jung/jung;Edward Jenner/jenner
0.01|Georg Ohm/ohm;Heinrich Hertz/hertz;Christiaan Huygens/huygens;Anders Celsius/celsius;Daniel Fahrenheit/fahrenheit;James Joule/joule;Amedeo Avogadro/avogadro;Henri Becquerel/becquerel;Wolfgang Pauli/pauli;Satyendra Nath Bose;C. V. Raman/cv raman;Murray Gell-Mann/gell mann;Kip Thorne;Jennifer Doudna/doudna;Dian Fossey/fossey;Alfred Wegener/wegener;Alfred Russel Wallace;Galen;Avicenna/ibn sina;Al-Khwarizmi/al khwarizmi;Eratosthenes;Democritus;Aryabhata;William Herschel/herschel;Roger Penrose/penrose;Kurt Godel/godel;Claude Shannon/shannon;Robert Goddard/goddard;B. F. Skinner/skinner;Robert Koch/koch;Joseph Lister/lister;Antonie van Leeuwenhoek/van leeuwenhoek/leeuwenhoek;Mae Jemison;Irene Joliot-Curie
0.005|Max Born;Louis de Broglie/de broglie;Charles Lyell/lyell;Jean-Baptiste Lamarck/lamarck;Omar Khayyam;Thales;Hipparchus;Caroline Herschel;Jocelyn Bell Burnell/bell burnell;Georges Lemaitre/lemaitre;Fred Hoyle/hoyle;Arthur Eddington/eddington;Konstantin Tsiolkovsky/tsiolkovsky;Ignaz Semmelweis/semmelweis;Otto Hahn;E. O. Wilson;Stephen Jay Gould
0.002|Abdus Salam;Hideki Yukawa/yukawa;Zhang Heng;Shen Kuo;Brahmagupta;Annie Jump Cannon;Karl Schwarzschild/schwarzschild;Sergei Korolev/korolev;Santiago Ramon y Cajal/ramon y cajal;Camillo Golgi/golgi;Hans Christian Orsted/orsted/oersted;Svante Arrhenius/arrhenius;James Lovelock/lovelock
`,
  },
  {
    id: "ball-sports",
    q: "Name a sport played with a ball",
    a: `
Soccer|30|football,association football
Basketball|25|
Baseball|8|
Tennis|8|
Volleyball|6|
American football|5|gridiron,nfl
Golf|4|
Rugby|3|
Cricket|2|
Bowling|1|ten pin bowling,tenpin
Table tennis|1|ping pong
Handball|1|
Softball|0.5|
Squash|0.5|
Pickleball|0.4|
Billiards|0.4|pool,eight ball
Water polo|0.3|
Lacrosse|0.3|
Dodgeball|0.3|
Field hockey|0.3|hockey
Beach volleyball|0.2|
Netball|0.2|
Polo|0.2|
Snooker|0.2|
Kickball|0.2|
Croquet|0.1|
Bocce|0.1|bocce ball
Racquetball|0.1|
Padel|0.1|
Australian rules football|0.1|aussie rules,afl
Pétanque|0.08|petanque,boules
Wiffle ball|0.05|wiffleball
Gaelic football|0.05|
Hurling|0.05|
Rounders|0.05|
Jai alai|0.02|
Sepak takraw|0.02|takraw
Korfball|0.02|
Bandy|0.02|
Goalball|0.02|
Basque pelota|0.02|pelota
Pesäpallo|0.01|pesapallo
Tchoukball|0.01|
Teqball|0.01|
Footvolley|0.01|
Bossaball|0.005|
Kin-Ball|0.005|kinball
0.05|Mini golf/minigolf/putt putt
0.03|Futsal/indoor soccer;Foosball/table football
0.02|Flag football;Tetherball;Four square;Lawn bowls/bowls
0.01|Floorball;Spikeball/roundnet;Quadball/quidditch;Beach soccer
0.005|Paddle tennis;Canadian football;Skittles;Stickball;Wheelchair basketball;Gaga ball/gaga;Footbag/hacky sack;Paddleball
0.002|Platform tennis;Real tennis;Wallyball;Sitting volleyball;Canoe polo;Bicycle polo;Shinty;Camogie;Rink hockey/roller hockey;Candlepin bowling;Duckpin bowling;Arena football;Boccia;Calcio storico;Ulama/pok ta pok/mesoamerican ballgame
0.001|Fives;Cycle ball;Elephant polo;Polocrosse;Lapta;Oina;Beep baseball;Chinlone;Kemari;Cuju;Throwball
`,
  },
  {
    id: "colors",
    q: "Name a color",
    a: `
Red|25|
Blue|25|
Green|12|
Yellow|8|
Purple|6|
Orange|5|
Pink|4|
Black|4|
White|3|
Brown|1|
Gray|1|grey
Turquoise|0.6|
Teal|0.5|
Magenta|0.5|
Gold|0.5|golden
Silver|0.4|
Maroon|0.4|
Violet|0.4|
Indigo|0.4|
Cyan|0.3|
Lavender|0.3|
Beige|0.3|
Navy|0.3|navy blue
Crimson|0.2|
Burgundy|0.2|
Coral|0.2|
Lime|0.2|lime green
Fuchsia|0.15|
Scarlet|0.15|
Olive|0.15|olive green
Mint|0.15|mint green
Peach|0.15|
Aquamarine|0.1|aqua
Salmon|0.1|
Tan|0.1|
Ivory|0.1|
Cerulean|0.08|
Cream|0.08|
Lilac|0.08|
Chartreuse|0.06|
Mauve|0.06|
Periwinkle|0.06|
Emerald|0.06|emerald green
Khaki|0.05|
Amber|0.05|
Plum|0.05|
Ochre|0.04|ocher
Taupe|0.04|
Cobalt|0.04|cobalt blue
Vermilion|0.03|vermillion
Sienna|0.03|burnt sienna,raw sienna
Mahogany|0.03|
Sepia|0.03|
Ultramarine|0.03|
Chestnut|0.03|
Puce|0.02|
Umber|0.02|burnt umber
Saffron|0.02|
Celadon|0.01|
Viridian|0.01|
Cinnabar|0.01|
Heliotrope|0.01|
Gamboge|0.005|
Zaffre|0.005|
Xanadu|0.005|
Eigengrau|0.005|
0.1|Sky blue;Royal blue;Baby blue;Hot pink;Rose;Rust;Forest green;Neon green;Charcoal
0.05|Powder blue;Midnight blue;Electric blue;Seafoam/sea green;Sage;Kelly green;Hunter green;Mustard;Tangerine;Copper;Bronze;Caramel;Chocolate;Wine;Slate;Off-white;Raspberry;Cherry;Blush;Apricot;Sapphire;Jade;Ruby
0.03|Steel blue;Prussian blue;Pistachio;Avocado;Moss;Pine;Lemon;Canary;Goldenrod;Pumpkin;Brass;Camel;Coffee;Mocha;Auburn;Brick;Cerise;Bubblegum;Champagne;Eggshell;Snow;Pearl;Ash;Platinum;Gunmetal;Jet;Ebony;Orchid;Amethyst;Eggplant/aubergine;Grape;Oxblood;Carmine;Thistle;Wisteria
0.01|Egyptian blue;Jungle green;Butter;Espresso;Hazel;Russet;Claret;Alizarin;Rosewood;Byzantium;Tyrian purple;Phthalo blue;Phthalo green;Tiffany blue;Persian blue;Cadmium red;Cadmium yellow;Titanium white;Klein blue/international klein blue;Vantablack
0.005|Hooker's green/hookers green;Payne's grey/paynes grey;Davy's grey;Paris green;Scheele's green;Mummy brown;Indian yellow;Naples yellow;Lamp black;Bistre;Fallow;Glaucous;Isabelline;Falu red;Coquelicot;Caput mortuum;Atomic tangerine;Razzmatazz;Mikado yellow;Majorelle blue
`,
  },
  {
    id: "dogs",
    q: "Name a dog breed",
    a: `
Labrador|18|lab,labrador retriever
Golden retriever|14|golden
German shepherd|10|alsatian
Poodle|7|
Bulldog|6|english bulldog,british bulldog
Chihuahua|6|
Husky|5|siberian husky
Beagle|5|
Pug|3|
Dachshund|3|wiener dog,sausage dog,doxie
Rottweiler|2|rottie
Corgi|2|welsh corgi,pembroke corgi
French bulldog|1.5|frenchie
Boxer|1.5|
Border collie|1.5|collie
Pit bull|1.5|pitbull,american pit bull terrier
Great Dane|1.2|
Dalmatian|1|
Doberman|1|dobermann,doberman pinscher
Shih Tzu|1|shihtzu
Yorkshire terrier|1|yorkie
Australian shepherd|0.6|aussie
Saint Bernard|0.5|st bernard
Greyhound|0.5|
Bernese mountain dog|0.4|bernese
Cocker spaniel|0.4|cocker
Schnauzer|0.4|miniature schnauzer
Shiba Inu|0.4|shiba
Pomeranian|0.4|
Maltese|0.3|
Basset hound|0.3|basset
Jack Russell|0.3|jack russell terrier
Labradoodle|0.3|
Akita|0.2|
Samoyed|0.2|
Boston terrier|0.2|
Cavalier King Charles spaniel|0.2|cavalier,king charles spaniel
Goldendoodle|0.2|
Chow chow|0.15|chow
Bloodhound|0.15|
Newfoundland|0.15|newfie
Bichon frisé|0.15|bichon,bichon frise
Alaskan malamute|0.15|malamute
Australian cattle dog|0.1|blue heeler,heeler
Shar Pei|0.1|sharpei
Weimaraner|0.1|
Vizsla|0.1|
Whippet|0.1|
Great Pyrenees|0.1|pyrenean mountain dog
Shetland sheepdog|0.1|sheltie
Bull terrier|0.1|
Westie|0.1|west highland terrier,west highland white terrier
Cockapoo|0.1|
Afghan hound|0.08|afghan
Irish wolfhound|0.08|wolfhound
Scottish terrier|0.08|scottie
Papillon|0.05|
Borzoi|0.05|
Basenji|0.05|
Pekingese|0.05|
Havanese|0.05|
Rhodesian ridgeback|0.05|ridgeback
Lhasa Apso|0.04|
Leonberger|0.02|
Komondor|0.02|
Puli|0.02|
Xoloitzcuintli|0.02|xolo,mexican hairless
Lagotto Romagnolo|0.01|lagotto
Catahoula|0.01|catahoula leopard dog
Norwegian Lundehund|0.005|lundehund
Azawakh|0.005|
Otterhound|0.005|
Mudi|0.005|
Bergamasco|0.005|
0.1|Belgian Malinois/malinois;Staffordshire bull terrier/staffie/staffy;German shorthaired pointer/pointer/gsp;English springer spaniel/springer spaniel/springer;Irish setter/red setter;Old English sheepdog;Cane Corso;Miniature pinscher/min pin;Italian greyhound
0.05|Airedale terrier/airedale;Australian kelpie/kelpie;Bullmastiff/bull mastiff;Cairn terrier;Rough collie/lassie;Coonhound/redbone coonhound;Maltipoo;American bulldog;American Staffordshire terrier/amstaff;Anatolian shepherd;Portuguese water dog;Soft-coated wheaten terrier/wheaten terrier;Mutt/mixed breed
0.03|Brittany;Bearded collie;Border terrier;Brussels griffon;Chinese crested;Dogo Argentino;Dogue de Bordeaux;English setter;Fox terrier;Foxhound;Giant schnauzer;Greater Swiss mountain dog;Japanese chin;Keeshond;Saluki;Tibetan mastiff;Bernedoodle;Cavapoo;Puggle;Jindo/korean jindo;American Eskimo dog/american eskimo
0.02|Bouvier des Flandres/bouvier;Briard;Chesapeake Bay retriever/chessie;Coton de Tulear;Flat-coated retriever;Gordon setter;Irish terrier;Kerry blue terrier;Neapolitan mastiff;Norfolk terrier;Norwich terrier;Nova Scotia duck tolling retriever/toller;Pharaoh hound;Schipperke;Tibetan terrier;Welsh terrier;Pomsky;Schnoodle;Sheepadoodle;Aussiedoodle;Morkie;Yorkipoo;Chiweenie;Dorgi;Caucasian shepherd/ovcharka;Boerboel;Tosa
0.01|Akbash;Bedlington terrier;Belgian tervuren;Boykin spaniel;Chinook;Clumber spaniel;Curly-coated retriever;Dandie Dinmont terrier;Entlebucher;Field spaniel;Finnish spitz;German wirehaired pointer;Harrier;Ibizan hound;Irish water spaniel;Kuvasz;Lakeland terrier;Manchester terrier;Plott hound;Sealyham terrier;Skye terrier;Spinone Italiano/spinone;Sussex spaniel;Swedish vallhund;Tibetan spaniel;Treeing walker coonhound;Welsh springer spaniel;Wirehaired pointing griffon;Kooikerhondje;Swedish lapphund;Peruvian Inca orchid;Kai Ken;Shikoku;Hokkaido;Kishu;Central Asian shepherd/alabai;Shih poo
`,
  },
  {
    id: "pasta",
    q: "Name a pasta shape",
    a: `
Spaghetti|35|
Penne|15|
Macaroni|10|elbow,elbow macaroni,mac
Fettuccine|6|fettucine,fettuccini
Lasagna|5|lasagne
Farfalle|4|bow tie,bowtie,butterfly
Ravioli|3|
Fusilli|3|
Rigatoni|3|
Linguine|3|linguini
Rotini|2|
Tortellini|2|
Ziti|1.5|
Shells|1.5|conchiglie,pasta shell
Angel hair|1|capellini
Gnocchi|1|
Orzo|1|
Tagliatelle|0.8|
Pappardelle|0.5|
Bucatini|0.4|
Orecchiette|0.3|
Cavatappi|0.3|
Vermicelli|0.3|
Cannelloni|0.3|
Ditalini|0.2|
Gemelli|0.2|
Manicotti|0.2|
Radiatori|0.1|
Campanelle|0.1|
Paccheri|0.1|
Rotelle|0.1|wagon wheel,ruote
Alphabet pasta|0.1|alphabet,alfabeto
Stelline|0.05|stars
Strozzapreti|0.05|
Trofie|0.05|
Casarecce|0.05|
Mafaldine|0.05|mafalda
Cappelletti|0.05|
Agnolotti|0.05|
Lumache|0.03|
Anelli|0.03|
Garganelli|0.03|
Cascatelli|0.03|
Pici|0.02|
Busiate|0.01|
Corzetti|0.01|
Lorighittas|0.005|
Su filindeu|0.005|filindeu
0.05|Tortiglioni;Mezze maniche;Conchiglioni/jumbo shells;Acini di pepe;Fideo/fideos;Pastina;Tortelloni;Spatzle/spaetzle
0.03|Spaghettini;Tagliolini;Bavette;Sedanini;Mostaccioli;Cavatelli;Fregola/fregula;Ditali;Tubetti;Farfalline;Lumaconi;Gramigna;Torchio;Gigli;Fusilli lunghi/fusilli bucati;Malloreddus/gnocchetti sardi;Tortelli;Calamarata;Mezzi rigatoni
0.01|Fedelini;Trenette;Tajarin;Bigoli;Umbricelli;Strangozzi/stringozzi;Chitarra/spaghetti alla chitarra;Elicoidali;Candele;Fiorentine;Creste di gallo;Scialatielli;Maltagliati;Lagane;Testaroli;Pizzoccheri;Passatelli;Mezzelune;Pansotti;Culurgiones/culurgionis;Casoncelli;Anolini;Caramelle;Fagottini;Sacchetti
`,
  },
  {
    id: "yellow",
    q: "Name something that's yellow",
    a: `
Banana|35|
Sun|20|the sun
Lemon|10|
Sunflower|3|
Corn|3|corn on the cob,maize
School bus|3|bus
Taxi|2|cab,taxi cab
Cheese|2|
Rubber duck|1.5|duck,rubber ducky,ducky
Bee|1|bumblebee
Pineapple|1|
Butter|1|
Egg yolk|1|yolk
Mustard|1|
Canary|0.5|
Pencil|0.5|
Gold|0.5|
Chick|0.5|baby chick
Minion|0.5|
Tennis ball|0.4|
SpongeBob|0.3|spongebob squarepants
Pikachu|0.3|
Daffodil|0.3|
Dandelion|0.3|
Highlighter|0.3|
Star|0.3|
Mango|0.3|
Lemonade|0.2|
Smiley face|0.2|smiley,emoji
Sticky note|0.2|post it,post it note
Homer Simpson|0.1|the simpsons,simpsons
Big Bird|0.1|
Pac-Man|0.1|pacman
Tweety|0.1|tweety bird
Yellow card|0.1|
Sulfur|0.1|sulphur
Turmeric|0.1|
Caution tape|0.1|
Lightning|0.1|lightning bolt
Squash|0.1|
Saffron|0.05|
Buttercup|0.05|
Hard hat|0.05|
Pollen|0.05|
Yellow Submarine|0.05|
Goldfinch|0.03|
Citrine|0.02|
Forsythia|0.01|
Canola|0.01|rapeseed
0.05|Yellow pepper/yellow bell pepper;McDonald's arches/golden arches/mcdonalds
0.03|Custard;Mac and cheese/macaroni and cheese;Popcorn;Honey;Yellow tulip/tulip;Marigold;Yellow jacket/wasp
0.02|Golden delicious/golden apple;Peeps;Curry;Omelette;Scrambled eggs;Yellow lab/yellow labrador;Bart Simpson/lisa simpson;Winnie the Pooh/pooh bear/pooh;Sponge/kitchen sponge;Construction equipment/bulldozer/excavator/digger;Caution sign/warning sign;Raincoat/rain jacket/slicker
0.01|Star fruit/carambola;Plantain;Quince;Banana pudding;Twinkie;Polenta;Goldenrod;Wattle/mimosa;Yellow tang;Banana slug;Yellow jersey/maillot jaune;Road lines/yellow line;Legal pad;Brass;Topaz;Amber;Venus;Coldplay's Yellow/yellow by coldplay;Yellow Pages;Snapchat logo/snapchat
0.005|Yellowcake;Io;National Geographic border/national geographic
`,
  },
  {
    id: "gems",
    q: "Name a gemstone",
    a: `
Diamond|30|
Ruby|18|
Emerald|15|
Sapphire|12|
Amethyst|6|
Pearl|3|
Opal|3|
Topaz|2.5|
Jade|2|
Garnet|1.5|
Onyx|1|
Aquamarine|1|
Turquoise|1|
Peridot|0.6|
Quartz|0.6|rose quartz
Citrine|0.5|
Lapis lazuli|0.4|lapis
Tanzanite|0.3|
Moonstone|0.3|
Tourmaline|0.3|
Amber|0.3|
Obsidian|0.2|
Agate|0.2|
Alexandrite|0.15|
Jasper|0.1|
Malachite|0.1|
Morganite|0.1|
Spinel|0.1|
Zircon|0.1|
Coral|0.1|
Labradorite|0.05|
Bloodstone|0.05|
Carnelian|0.05|
Beryl|0.05|
Sunstone|0.03|
Chrysoberyl|0.02|
Kunzite|0.02|
Iolite|0.02|
Painite|0.02|
Benitoite|0.01|
Grandidierite|0.005|
Jeremejevite|0.005|
0.05|Cubic zirconia/cz;Tiger's eye/tigers eye;Rose quartz;Fluorite;Hematite;Pyrite/fool's gold
0.03|Chalcedony;Aventurine;Rhodochrosite;Sodalite;Azurite;Smoky quartz;Ametrine;Amazonite;Moldavite;Jet;Paraiba tourmaline/paraiba;Mother of pearl/nacre;Fire opal;Black opal;Star sapphire;Cat's eye/cats eye
0.02|Tsavorite;Demantoid;Chrysoprase;Rhodonite;Chrysocolla;Apatite;Kyanite;Larimar;Charoite;Ammolite;Howlite;Rubellite;Padparadscha;Red beryl/bixbite;Unakite;Serpentine
0.01|Rhodolite;Hessonite;Spessartine;Pyrope;Almandine;Uvarovite;Sphene/titanite;Diopside;Hiddenite;Heliodor;Goshenite;Rutilated quartz;Prasiolite/green amethyst;Sugilite;Seraphinite;Prehnite;Andalusite;Danburite;Zoisite;Indicolite
0.005|Sapphirine;Taaffeite;Musgravite;Poudretteite;Thulite;Euclase;Phenakite;Scapolite;Sinhalite;Cordierite
`,
  },
  {
    id: "constellations",
    q: "Name a constellation",
    a: `
Orion|25|the hunter
Ursa Major|20|big dipper,great bear,the plough,plough
Cassiopeia|7|
Ursa Minor|6|little dipper,little bear
Scorpius|5|scorpio,scorpion
Leo|4|
Gemini|3|
Taurus|3|
Andromeda|3|
Cygnus|2|swan,northern cross
Pegasus|2|
Sagittarius|2|
Draco|1.5|dragon
Aquarius|1.5|
Aries|1|
Cancer|1|
Virgo|1|
Crux|1|southern cross
Libra|0.8|
Capricornus|0.8|capricorn
Pisces|0.8|
Lyra|0.6|
Perseus|0.6|
Canis Major|0.6|great dog
Hercules|0.5|
Aquila|0.3|
Centaurus|0.3|
Boötes|0.2|bootes
Ophiuchus|0.2|
Cepheus|0.15|
Auriga|0.1|
Phoenix|0.1|
Corona Borealis|0.1|
Canis Minor|0.1|
Hydra|0.1|
Delphinus|0.05|
Carina|0.05|
Lepus|0.05|
Monoceros|0.03|
Columba|0.03|
Lynx|0.03|
Camelopardalis|0.02|
Vulpecula|0.02|
Fornax|0.02|
Sculptor|0.02|
Musca|0.02|
Tucana|0.02|
Pavo|0.02|
Pyxis|0.01|
Microscopium|0.01|
Horologium|0.01|
Antlia|0.01|
Volans|0.01|
Chamaeleon|0.01|
0.1|Cetus/the whale;Eridanus;Triangulum;Corvus/the crow;Serpens;Vela;Puppis;Sagitta/the arrow
0.05|Canes Venatici;Coma Berenices;Corona Australis;Crater;Lacerta;Leo Minor;Lupus;Piscis Austrinus;Scutum;Grus;Dorado;Ara;Argo Navis
0.02|Apus;Caelum;Circinus;Equuleus;Hydrus;Indus;Mensa;Norma;Octans;Pictor;Reticulum;Sextans;Telescopium;Triangulum Australe
`,
  },
  {
    id: "wheels",
    q: "Name something with wheels",
    a: `
Car|40|automobile
Bicycle|15|bike
Bus|6|
Skateboard|5|
Truck|5|lorry
Train|3|
Motorcycle|3|motorbike
Wheelchair|2|
Shopping cart|2|shopping trolley,trolley,cart
Scooter|2|
Stroller|1.5|pram,pushchair,buggy
Roller skates|1.5|rollerblades,inline skates,skates
Wheelbarrow|1|
Office chair|1|chair,desk chair
Suitcase|0.8|luggage,rolling suitcase
Tractor|0.5|
Airplane|0.5|plane,aeroplane,jet
Wagon|0.5|red wagon,covered wagon
Tricycle|0.4|trike
Unicycle|0.3|
Lawn mower|0.3|lawnmower
Go-kart|0.2|kart
Tram|0.2|streetcar
Rickshaw|0.1|tuk tuk
Segway|0.1|
Forklift|0.1|
Chariot|0.1|
Roller coaster|0.1|
Ambulance|0.1|
Fire truck|0.1|fire engine
Pizza cutter|0.1|pizza wheel
Toy car|0.1|hot wheels,matchbox car
Hand truck|0.05|dolly
Hoverboard|0.05|
Gurney|0.05|
Longboard|0.05|
Lunar rover|0.03|moon buggy,mars rover,rover
Tank|0.03|
Cannon|0.03|
Stagecoach|0.02|
Penny-farthing|0.02|
Heelys|0.02|
Rollator|0.02|walker
Velocipede|0.005|
0.1|Van/minivan
0.05|SUV;Pickup truck/pickup;Race car/racecar/f1 car/formula 1 car;Golf cart/golf buggy
0.03|Police car/cop car;Jeep;Semi truck/semi/18 wheeler/eighteen wheeler/big rig;Monster truck;ATV/quad bike/four wheeler;Moped;Subway/metro/underground train;Wheelie bin/trash can/garbage bin
0.02|Taxi/cab;Garbage truck/bin lorry;Cement mixer/concrete mixer;Dump truck;Carriage/horse carriage;Trailer
0.01|Limousine/limo;Tow truck;Dune buggy;Tandem bicycle/tandem;Cable car;Monorail;Bumper cars/dodgems;Helicopter;Vacuum cleaner/vacuum/robot vacuum;Toy train;Food truck;Ice cream truck/ice cream van;Mobile home/rv/camper/caravan/motorhome;Robot
0.005|Recumbent bike/recumbent;Pedicab;Ox cart;Space shuttle;Piano;Barbecue grill/grill;Hot dog cart/food cart
`,
  },
  {
    id: "rhymes-moon",
    q: "Name a word that rhymes with moon",
    a: `
Spoon|25|
Soon|15|
June|10|
Tune|8|
Noon|8|
Balloon|6|
Raccoon|4|racoon
Cartoon|3|
Cocoon|2|
Dune|2|
Lagoon|1|
Monsoon|1|
Prune|0.8|
Typhoon|0.5|
Harpoon|0.5|
Loon|0.5|
Baboon|0.5|
Croon|0.4|
Rune|0.4|
Maroon|0.4|
Honeymoon|0.4|
Afternoon|0.4|
Macaroon|0.3|
Platoon|0.3|
Saloon|0.3|
Boon|0.3|
Goon|0.3|
Swoon|0.3|
Neptune|0.3|
Tycoon|0.2|
Buffoon|0.2|
Immune|0.2|
Lampoon|0.1|
Commune|0.1|
Pontoon|0.1|
Bassoon|0.1|
Doubloon|0.05|
Festoon|0.05|
Pantaloon|0.05|
Tribune|0.05|
Strewn|0.05|
Opportune|0.05|
Spittoon|0.03|
Dragoon|0.03|
Attune|0.03|
Hewn|0.03|
Impugn|0.02|
Importune|0.01|
Picayune|0.01|
0.05|Teaspoon/tablespoon;Forenoon;Fine-tune/retune
0.01|Cancun;Lune;Boone;Cameroon;Brigadoon
0.005|Jejune;Triune;Pune;Kowloon;Rangoon;Walloon;Simoon;Poltroon
0.002|Oppugn;Calhoun;Gadroon
`,
  },
];
