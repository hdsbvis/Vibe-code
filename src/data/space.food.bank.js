// Food and drink prompts for the Space world. Format: see space.bank.js.

export default [
  {
    id: 'fruit',
    q: 'Name a fruit',
    a: `
Apple|22|
Banana|18|
Orange|12|
Strawberry|7|
Grape|5|
Mango|4|
Pineapple|3.5|
Watermelon|3.5|
Pear|2.5|
Peach|2|
Kiwi|2|kiwifruit
Cherry|2|
Lemon|1.5|
Blueberry|1.5|
Raspberry|1.2|
Melon|1|cantaloupe,honeydew
Plum|0.8|
Grapefruit|0.8|
Lime|0.8|
Coconut|0.8|
Pomegranate|0.6|
Apricot|0.6|
Papaya|0.5|
Avocado|0.5|
Blackberry|0.5|
Tomato|0.5|
Fig|0.4|
Nectarine|0.4|
Tangerine|0.4|mandarin,clementine,satsuma
Passion fruit|0.4|passionfruit
0.2|Dragon fruit/pitaya;Lychee/litchi;Guava;Cranberry;Date;Persimmon;Kumquat;Currant/blackcurrant/redcurrant;Gooseberry;Starfruit/carambola;Olive;Plantain;Quince;Mulberry;Elderberry
0.05|Jackfruit;Durian;Rambutan;Mangosteen;Longan;Tamarind;Soursop/guanabana;Custard apple/cherimoya;Breadfruit;Loquat;Medlar;Pomelo;Yuzu;Ugli fruit;Blood orange;Boysenberry;Loganberry;Cloudberry;Lingonberry;Huckleberry;Acai;Goji berry/goji;Feijoa;Salak/snake fruit;Sapodilla;Jabuticaba;Ackee;Miracle fruit;Buddha's hand;Finger lime;Pawpaw;Prickly pear;Physalis/cape gooseberry;Kiwano/horned melon;Bergamot
`,
  },
  {
    id: 'vegetables',
    q: 'Name a vegetable',
    a: `
Carrot|22|
Broccoli|15|
Potato|9|
Tomato|6|
Lettuce|5|
Cucumber|5|
Onion|4|
Spinach|4|
Pea|3.5|green peas
Corn|3|sweetcorn,maize
Cauliflower|3|
Pepper|2.5|bell pepper,capsicum
Cabbage|2|
Celery|1.5|
Green bean|1.5|string beans,beans
Zucchini|1.2|courgette
Mushroom|1|
Eggplant|1|aubergine
Asparagus|1|
Brussels sprout|1|sprouts,brussel sprouts
Sweet potato|0.8|yam
Kale|0.8|
Beet|0.8|beetroot
Pumpkin|0.8|
Garlic|0.6|
Radish|0.5|
Leek|0.5|
Squash|0.5|butternut squash
Turnip|0.4|
Artichoke|0.4|
0.2|Parsnip;Okra;Bok choy/pak choi;Arugula/rocket;Swiss chard/chard;Fennel;Scallion/spring onion/green onion;Shallot;Rutabaga/swede;Watercress;Edamame/soybean;Chickpea;Lentil;Avocado;Chili/chilli;Ginger;Endive/chicory;Kohlrabi;Collard greens/collards
0.05|Celeriac;Jicama;Daikon/mooli;Cassava/yuca/manioc;Taro;Lotus root;Bamboo shoot;Water chestnut;Bean sprout;Radicchio;Romanesco;Broccolini;Mustard greens;Salsify;Samphire;Nopal/nopales;Fiddlehead;Chayote;Tomatillo;Bitter melon/bitter gourd;Sorrel;Purslane;Seaweed/nori;Sunchoke/jerusalem artichoke;Rapini/broccoli rabe;Mizuna;Tatsoi;Gai lan/kai-lan;Horseradish;Wasabi
`,
  },
  {
    id: 'cheese',
    q: 'Name a type of cheese',
    a: `
Cheddar|28|
Mozzarella|14|
Swiss|7|swiss cheese,emmental,emmentaler
Parmesan|7|parmigiano,parmigiano reggiano
Brie|6|
Blue cheese|5|bleu cheese
Feta|4.5|
Gouda|4|
Cream cheese|3|philadelphia
American|2.5|american cheese
Goat cheese|2.5|chevre
Camembert|2|
Provolone|1.5|
Cottage cheese|1.5|
Pepper jack|1.2|
Monterey Jack|1.2|jack
Halloumi|1.2|
Ricotta|1|
Colby|0.8|colby jack
Gorgonzola|0.8|
Edam|0.8|
Gruyère|0.8|gruyere
Mascarpone|0.6|
Stilton|0.6|
Havarti|0.5|
Manchego|0.5|
Roquefort|0.5|
Paneer|0.4|
String cheese|0.4|
Muenster|0.4|munster
0.2|Pecorino/pecorino romano;Red Leicester;Wensleydale;Burrata;Asiago;Fontina;Raclette;Limburger;Jarlsberg;Queso fresco/queso;Cotija;Oaxaca;Double Gloucester;Cheshire;Boursin;Babybel;Taleggio;Comté/comte
0.05|Caerphilly;Lancashire;Reblochon;Époisses/epoisses;Morbier;Cantal;Saint-Nectaire;Pont-l'Évêque/pont leveque;Livarot;Brillat-Savarin;Tomme/tomme de savoie;Mimolette;Beaufort;Ossau-Iraty;Appenzeller;Tête de Moine/tete de moine;Tilsit;Leerdammer;Maasdam;Esrom;Danish blue/danablu;Cambozola;Grana Padano;Scamorza;Caciocavallo;Stracchino;Robiola;Idiazabal;Cabrales;Mahón/mahon;Tetilla;Kefalotyri;Kasseri;Graviera;Quark;Brunost/gjetost;Cheese curds;Labneh;Humboldt Fog;Stinking Bishop;Cornish Yarg;Port Salut;Neufchâtel/neufchatel;Provel;Velveeta
`,
  },
  {
    id: 'ice-cream',
    q: 'Name an ice cream flavour',
    a: `
Vanilla|28|
Chocolate|24|
Strawberry|12|
Mint chocolate chip|7|mint choc chip,mint chip,mint
Cookies and cream|5|oreo,cookies n cream
Cookie dough|4|chocolate chip cookie dough
Rocky road|2.5|
Pistachio|2.5|
Caramel|2|salted caramel
Coffee|1.5|
Chocolate chip|1.5|choc chip
Butter pecan|1.2|
Neapolitan|1.2|
Raspberry ripple|0.8|raspberry
Banana|0.8|
Cherry|0.8|cherry garcia
Coconut|0.6|
Lemon|0.6|lemon sorbet
Mango|0.6|mango sorbet
Rum raisin|0.6|rum and raisin
Peanut butter|0.5|peanut butter cup
Bubblegum|0.5|bubble gum
Hazelnut|0.5|nocciola
Fudge|0.4|fudge brownie,chocolate fudge brownie,chocolate fudge
Toffee|0.4|honeycomb,hokey pokey
Birthday cake|0.4|cake batter
0.2|Stracciatella;Tiramisu;Dulce de leche;Matcha/green tea;Cotton candy/candy floss;Pralines and cream/praline;Blueberry;Peach;Orange/orange sherbet;Maple walnut/maple;Cheesecake/strawberry cheesecake;Pumpkin;Peppermint;Cinnamon;Butterscotch;S'mores/smores
0.05|Black raspberry;Moose tracks;Tutti frutti;Spumoni;Superman;Blue moon;Lavender;Ube;Red bean;Black sesame;Tiger tail;Phish Food;Chunky Monkey;Half Baked;Eggnog;Licorice/liquorice;Passion fruit;Watermelon;Lime;Amarena;Zabaglione;Bacio;Gianduja;Fior di latte;Malaga;Kulfi;Chocolate orange;Brown bread;Clotted cream;Earl Grey;Honey;Rose;Saffron
`,
  },
  {
    id: 'herbs-spices',
    q: 'Name a herb or spice',
    a: `
Pepper|16|black pepper
Basil|12|
Cinnamon|10|
Oregano|8|
Parsley|6|
Garlic|5|garlic powder
Paprika|5|
Rosemary|4.5|
Thyme|4|
Mint|3.5|
Cumin|3|
Ginger|3|
Chili|2.5|chilli,chili powder,chilli powder,cayenne,cayenne pepper,chili flakes
Coriander|2|cilantro
Turmeric|2|
Nutmeg|1.5|
Sage|1.5|
Dill|1.2|
Vanilla|1|
Saffron|1|
Bay leaf|0.8|bay leaves,bay
Curry powder|0.8|curry
Cloves|0.8|
Chives|0.6|
Cardamom|0.6|
Tarragon|0.4|
0.2|Fennel/fennel seed;Mustard/mustard seed;Star anise/anise/aniseed;Allspice;Lemongrass;Marjoram;Caraway;Sesame/sesame seeds;Onion powder;Lavender;Sumac;Za'atar/zaatar;Fenugreek;Wasabi;Horseradish;Juniper/juniper berries;Poppy seed;Mace;Garam masala;Five spice/chinese five spice;Italian seasoning;Herbes de Provence;Old Bay
0.05|Asafoetida/hing;Galangal;Nigella/nigella seeds/kalonji;Ajwain/carom;Annatto/achiote;Epazote;Shiso/perilla;Curry leaf;Kaffir lime leaf/makrut lime leaf/lime leaf;Lovage;Chervil;Savory;Borage;Sorrel;Hyssop;Angelica;Grains of paradise;Long pepper;Sichuan pepper/szechuan pepper;Pink peppercorn;Tonka bean;Mahlab;Amchur/amchoor;Black cardamom;Ras el hanout;Berbere;Baharat;Dukkah;Shichimi/togarashi;Culantro;Lemon balm;Lemon verbena;Stevia;Tamarind;Licorice root/liquorice
`,
  },
  {
    id: 'bread',
    q: 'Name a type of bread',
    a: `
White bread|18|white,sliced bread,sandwich bread
Sourdough|14|
Baguette|10|french bread,french stick
Whole wheat|8|wholemeal,brown bread,whole grain,wholegrain,wheat bread,brown,wheat
Rye|6|rye bread
Naan|6|nan
Pita|5|pitta
Bagel|4|
Ciabatta|3.5|
Garlic bread|3|
Brioche|2.5|
Focaccia|2.5|
Banana bread|2|
Tortilla|2|
Croissant|1.5|
Flatbread|1.2|
Cornbread|1.2|
Multigrain|1|seeded,granary
Pumpernickel|1|
Soda bread|0.8|irish soda bread
Challah|0.8|
English muffin|0.6|
Pretzel|0.6|
Roll|0.6|bread roll,bun,dinner roll,bap
Roti|0.5|chapati,chapatti
Crumpet|0.4|
0.2|Breadstick/grissini;Paratha;Lavash;Matzo/matzah;Fougasse;Panettone;Stollen;Milk bread/shokupan;Potato bread;Tiger bread;Zucchini bread;Monkey bread;Injera;Bao/steamed bun/mantou;Arepa;Frybread/fry bread;Cuban bread;Texas toast;Melba toast;Crispbread/knackebrot;Biscuit;Scone;Damper;Bannock;Fruit loaf/raisin bread/malt loaf;Hot cross bun
0.05|Pane carasau;Piadina;Barbari;Sangak;Khachapuri;Simit;Pide;Kulcha;Bhatura;Puri;Appam;Lefse;Limpa;Rugbrød/rugbrod;Vollkornbrot;Bauernbrot;Pain de campagne;Ficelle;Boule;Batard;Kaiser roll;Bolillo;Telera;Concha;Pandesal;Anpan;Melonpan;Cottage loaf;Bloomer;Stottie;Barm cake;Farl;Boxty;Barmbrack;Bara brith;Pan de muerto
`,
  },
  {
    id: 'soup',
    q: 'Name a soup',
    a: `
Chicken noodle|22|chicken soup,chicken noodle soup
Tomato|20|tomato soup
Vegetable|7|vegetable soup,veg soup
Minestrone|6|
Mushroom|4|cream of mushroom
French onion|4|onion soup,onion
Ramen|4|
Clam chowder|3|chowder
Pumpkin|2.5|butternut squash,squash
Lentil|2.5|
Potato|2|leek and potato,potato leek
Pho|2|
Miso|2|
Broccoli cheddar|1.5|broccoli,broccoli and cheese
Split pea|1.5|pea,pea and ham,pea soup
Gazpacho|1.2|
Borscht|1|borsch
Wonton|1|
Tortilla soup|0.8|chicken tortilla,tortilla
Chicken and rice|0.8|
Egg drop|0.8|
Hot and sour|0.8|
Gumbo|0.8|
Carrot|0.6|carrot and coriander
Beef barley|0.5|beef and barley
Lobster bisque|0.5|bisque
Tom yum|0.5|
Chili|0.5|
Matzo ball|0.4|
Black bean|0.4|
0.2|Italian wedding;Cream of chicken;Corn chowder/corn;Cauliflower;Bean/white bean/navy bean;Oxtail;Mulligatawny;Scotch broth;Cock-a-leekie/cock a leekie;Cullen skink;Goulash;Bouillabaisse;Vichyssoise;Pozole;Menudo;Laksa;Tom kha/tom kha gai;Avgolemono;Ribollita;Pasta e fagioli/pasta fagioli;Caldo verde;Udon;Congee;Bone broth/broth/consomme;Cabbage;Spinach;Asparagus;Celery;Watercress;Beetroot;Sweet potato
0.05|Albondigas;Sancocho;Ajiaco;Harira;Chorba;Solyanka;Shchi;Ukha;Zurek;Kharcho;Sinigang;Bulalo;Soto ayam;Bak kut teh;Samgyetang;Kimchi stew/kimchi jjigae;Tteokguk;Callaloo;Pepper pot;Egusi;Peanut soup/groundnut soup;Cioppino;She-crab;Mock turtle;Bird's nest;Erwtensoep/snert;Stracciatella
`,
  },
  {
    id: 'desserts',
    q: 'Name a dessert',
    a: `
Ice cream|20|
Cake|16|chocolate cake
Brownie|8|
Cheesecake|7|
Pie|6|apple pie
Cookie|5|biscuit
Tiramisu|4|
Pudding|3|
Donut|2.5|doughnut
Cupcake|2.5|
Crème brûlée|2|creme brulee
Chocolate mousse|2|mousse
Apple crumble|1.5|crumble,apple crisp
Pancakes|1.2|crepes,crepe
Trifle|1|
Sundae|1|
Jelly|1|jello
Tart|0.8|lemon tart,fruit tart
Macaron|0.8|macaroon
Churros|0.8|
Custard|0.8|
Pavlova|0.6|meringue
Waffle|0.6|
Panna cotta|0.6|
Flan|0.6|creme caramel
Baklava|0.6|
Sticky toffee pudding|0.5|
Fudge|0.4|
Gelato|0.4|
Sorbet|0.4|
Eclair|0.4|
Profiterole|0.4|cream puff
Banoffee pie|0.3|banoffee
Key lime pie|0.3|
Lemon meringue pie|0.3|lemon meringue
0.15|Cannoli;Strudel/apple strudel/apfelstrudel;Rice pudding;Bread pudding/bread and butter pudding;Cobbler/peach cobbler;Tres leches;Milkshake;Banana split;Eton mess;Black Forest cake/black forest gateau;Red velvet cake/red velvet;Carrot cake;Mochi;Gulab jamun;Souffle;Affogato;S'mores/smores;Fruit salad;Parfait;Cinnamon roll;Pecan pie;Pumpkin pie;Lava cake/chocolate fondant/molten chocolate cake
0.04|Mille-feuille/millefeuille;Tarte tatin;Clafoutis;Kheer;Jalebi;Rasgulla;Halva/halwa;Kulfi;Knafeh/kunafa;Loukoumades;Galaktoboureko;Sachertorte/sacher torte;Kaiserschmarrn;Rote Grütze/rote grutze;Bienenstich;Spotted dick;Jam roly-poly/roly poly;Treacle tart;Bakewell tart;Syllabub;Posset;Arctic roll;Baked Alaska;Bananas Foster;Cherries jubilee;Peach Melba;Pastel de nata/custard tart;Brigadeiro;Alfajores/alfajor;Lamington;Malva pudding;Koeksister;Mango sticky rice;Halo-halo;Dorayaki;Taiyaki;Bingsu;Tangyuan;Egg tart;Zeppole;Sfogliatella;Zabaglione;Semifreddo;Cassata;Tartufo;Blondie;Whoopie pie;Funnel cake;Beignet
`,
  },
  {
    id: 'sweets',
    q: 'Name a chocolate bar or sweet',
    a: `
Snickers|16|
KitKat|13|kit kat
Mars|8|mars bar
Twix|7|
M&M's|7|m&ms,m and ms
Hershey's|6|hershey,hershey bar,hersheys
Milky Way|4|
Reese's|4|reeses,peanut butter cups,reeses cups
Skittles|3.5|
Haribo|3|gummy bears,goldbears
Dairy Milk|3|cadbury,cadbury dairy milk,cadburys
Toblerone|2.5|
Bounty|2|
Kinder Bueno|2|bueno,kinder,kinder surprise,kinder egg
Milka|1.5|
Lindt|1.5|lindor
Ferrero Rocher|1.5|ferrero
Galaxy|1.2|dove
Crunchie|1|
Starburst|1|
Maltesers|1|
Smarties|1|
Butterfinger|0.8|
Twirl|0.8|
Aero|0.8|
Lion|0.6|lion bar
Jelly beans|0.6|jelly belly
Lollipop|0.6|chupa chups
Three Musketeers|0.6|3 musketeers
Sour Patch Kids|0.6|
Nerds|0.4|
Twizzlers|0.4|
Wispa|0.4|
Flake|0.4|
Daim|0.3|
Ritter Sport|0.3|
0.15|Almond Joy;Baby Ruth;PayDay;Crunch/nestle crunch;Heath;Rolo;Whoppers;Junior Mints;York Peppermint Pattie/york;Milk Duds;Tootsie Roll;Jolly Rancher;Swedish Fish;Airheads;Laffy Taffy;Life Savers;Mentos;Tic Tac;Werther's Original/werthers;Fruit Pastilles;Wine gums;Jelly Babies;Liquorice Allsorts/licorice/liquorice;Candy cane;Candy corn;Gobstopper/jawbreaker;Marshmallow;Toffee;Caramel;Truffle;Nougat;Marzipan;Turkish delight;Cotton candy/candy floss
0.04|Double Decker;Boost;Yorkie;Picnic;Drifter;Toffee Crisp;Curly Wurly;Freddo;Chomp;Caramac;Milkybar;Terry's Chocolate Orange;After Eight;Quality Street;Celebrations;Raffaello;Mon Chéri/mon cheri;Hanuta;Duplo;Knoppers;Kinder Country;Kinder Riegel;Yogurette;Balisto;Pocky;Hi-Chew;Tim Tam;Cherry Ripe;Violet Crumble;Coffee Crisp;Oh Henry;Mr. Goodbar;Take 5;Charleston Chew;Pez;Ring Pop;Pop Rocks;Fun Dip;Warheads
`,
  },
  {
    id: 'fast-food',
    q: 'Name a fast food chain',
    a: `
McDonald's|36|mcdonalds,maccas,mcd
Burger King|14|bk
KFC|10|kentucky fried chicken
Subway|7|
Wendy's|5|wendys
Taco Bell|5|
Pizza Hut|3.5|
Domino's|3|dominos
Chick-fil-A|2.5|chick fil a,chickfila
Five Guys|2|
Starbucks|1.5|
Popeyes|1.2|
Chipotle|1.2|
In-N-Out|1|in n out,in-n-out burger
Dunkin'|1|dunkin,dunkin donuts
Arby's|0.8|arbys
Nando's|0.8|nandos
Papa John's|0.6|papa johns
Dairy Queen|0.6|dq
Sonic|0.5|sonic drive-in
Shake Shack|0.5|
Jack in the Box|0.4|
Panda Express|0.4|
Greggs|0.4|
Little Caesars|0.3|
Carl's Jr.|0.3|carls jr,hardees
Whataburger|0.3|
0.15|White Castle;Jollibee;Tim Hortons;Pret A Manger/pret;Wingstop;Raising Cane's/canes;Culver's/culvers;Zaxby's/zaxbys;Bojangles;Del Taco;El Pollo Loco;Qdoba;Panera/panera bread;Jimmy John's/jimmy johns;Jersey Mike's/jersey mikes;Quiznos;Krispy Kreme;A&W/a and w;Checkers/rallys;Steak 'n Shake/steak n shake;Wimpy;Nordsee;Vapiano;Wagamama
0.04|Quick;Hesburger;Max Burgers/max;Telepizza;Leon;Itsu;Harvey's/harveys;Hungry Jack's/hungry jacks;Red Rooster;Oporto;Lotteria;MOS Burger;Yoshinoya;Sukiya;Pollo Campero;Chicken Cottage;Morley's/morleys;Wienerschnitzel;Long John Silver's/long john silvers;Church's Chicken/churchs/texas chicken;Sbarro;Auntie Anne's/auntie annes;Cinnabon;Baskin-Robbins/baskin robbins;Firehouse Subs;Potbelly;Smashburger;Fatburger;Freddy's/freddys;Cook Out;Krystal;Supermac's/supermacs
`,
  },
  {
    id: 'mexican',
    q: 'Name a Mexican food or dish',
    a: `
Taco|34|
Burrito|18|
Quesadilla|10|
Nachos|8|
Enchilada|7|
Guacamole|5|
Fajita|4|
Tamale|2.5|tamal
Churro|2|
Salsa|1.5|pico de gallo
Tostada|1|
Chimichanga|1|
Tortilla|1|tortilla chips,chips
Chili con carne|0.8|chili
Elote|0.8|street corn,esquites
Pozole|0.6|
Mole|0.6|mole poblano
Carnitas|0.5|
Refried beans|0.5|frijoles,beans
Chilaquiles|0.4|
Huevos rancheros|0.4|
Torta|0.3|
Taquito|0.3|flautas,flauta
Ceviche|0.3|
0.15|Al pastor/tacos al pastor;Birria;Barbacoa;Carne asada;Chile relleno/chiles rellenos;Sope;Gordita;Empanada;Menudo;Tres leches;Flan;Horchata;Queso/queso fundido/queso dip;Mexican rice/arroz rojo;Tortilla soup/sopa de tortilla;Cochinita pibil
0.04|Tlayuda;Huarache;Molletes;Pambazo;Cemita;Chalupa;Tlacoyo;Panucho;Salbute;Aguachile;Chiles en nogada;Caldo de pollo;Sopa de lima;Albondigas;Machaca;Migas;Entomatadas;Enfrijoladas;Papadzules;Nopales;Rajas/rajas con crema;Concha/pan dulce;Buñuelos/bunuelos;Cajeta;Paleta;Champurrado;Atole;Agua fresca;Tepache;Chamoy
`,
  },
  {
    id: 'japanese',
    q: 'Name a Japanese food or dish',
    a: `
Sushi|40|
Ramen|18|
Tempura|6|
Sashimi|5|
Udon|4|
Miso soup|4|miso
Teriyaki|3|chicken teriyaki,teriyaki chicken
Rice|2|
Gyoza|2|dumplings
Edamame|1.5|
Katsu|1.5|tonkatsu,katsu curry,chicken katsu
Mochi|1.5|
Onigiri|1.2|rice ball
Soba|1|
Yakitori|1|
Tofu|0.8|
Okonomiyaki|0.6|
Takoyaki|0.6|
Curry|0.6|japanese curry,kare
Wagyu|0.5|kobe beef
Bento|0.5|
Matcha|0.5|
Yakisoba|0.4|
Donburi|0.4|gyudon,katsudon,oyakodon
Wasabi|0.4|
0.15|Sukiyaki;Shabu-shabu/shabu shabu;Karaage;Tamagoyaki;Natto;Unagi/unadon;Nigiri;Maki/california roll/sushi roll;Dango;Taiyaki;Dorayaki;Daifuku;Oden;Tsukemono/pickles;Chawanmushi;Omurice;Korokke;Nabe;Pocky
0.04|Chirashi;Tamago kake gohan;Ochazuke;Kaiseki;Teppanyaki;Yakiniku;Kushikatsu;Monjayaki;Hiyashi chuka;Somen;Zaru soba;Champon;Tsukemen;Gyukatsu;Hambagu;Nikujaga;Kakigori;Anmitsu;Yokan;Senbei;Melonpan;Anpan;Castella/kasutera;Fugu;Ikura;Uni;Mentaiko;Umeboshi;Furikake;Nori;Dashi
`,
  },
  {
    id: 'sauces',
    q: 'Name a sauce or condiment',
    a: `
Ketchup|30|tomato ketchup,tomato sauce,catsup
Mustard|14|
Mayonnaise|12|mayo
BBQ sauce|7|barbecue sauce,barbecue,bbq
Soy sauce|6|soy
Hot sauce|5|tabasco
Ranch|3|ranch dressing
Salsa|2.5|
Sriracha|1.5|
Vinegar|1.5|balsamic,balsamic vinegar
Relish|1.2|pickle relish
Gravy|1.2|
Pesto|1|
Worcestershire sauce|1|worcestershire,worcester sauce
Tartar sauce|0.8|tartare sauce
Honey mustard|0.8|
Sweet chili|0.8|sweet chilli,sweet chili sauce
Aioli|0.6|garlic mayo,garlic sauce
Guacamole|0.6|
Hollandaise|0.5|
Teriyaki|0.5|teriyaki sauce
Brown sauce|0.5|hp sauce,hp
Salt|0.5|
Pepper|0.4|
Horseradish|0.4|
Tahini|0.3|
Hummus|0.3|
Chutney|0.3|mango chutney
Wasabi|0.3|
Pickles|0.3|
0.15|Alfredo;Marinara;Bolognese;Bechamel/white sauce;Cheese sauce;Buffalo sauce/buffalo;Fish sauce;Oyster sauce;Hoisin;Tzatziki;Chimichurri;Harissa;Mint sauce;Cranberry sauce;Apple sauce/applesauce;Bearnaise;Thousand Island;Caesar dressing/caesar;Blue cheese dressing;Vinaigrette;Olive oil;Sour cream;Curry sauce;Sweet and sour;Peri-peri/piri piri
0.04|Piccalilli;Branston;Salad cream;Marmite;Vegemite;Sambal;Gochujang;Ponzu;Mirin;Queso;Remoulade;Cocktail sauce/marie rose;Ajvar;Mostarda;Chili oil/chili crisp;XO sauce;Duck sauce;Plum sauce;Satay/peanut sauce;Mole;Adobo;Romesco;Zhug/zhoug;Toum;Amba;Banana ketchup;Maggi;Kewpie;Tonkatsu sauce;Chamoy;Jerk sauce;Mojo;Sofrito;Gremolata;Tapenade
`,
  },
];
