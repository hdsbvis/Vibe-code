// Sea, water and fish prompts for the Ocean world.
//
// Each line of `a` is one of:
//   Name|share%|alias,alias          one answer
//   share%|Name/alias;Name/alias     many answers that share one share
// "share" is a hand estimate of how many players out of 100 give that answer.

export default [
  {
    id: 'sharks',
    q: 'Name a kind of shark',
    a: `
Great white shark|38|great white,white shark
Hammerhead shark|14|hammerhead
Tiger shark|10|
Whale shark|8|
Bull shark|6|
Mako shark|4|mako,shortfin mako
Nurse shark|4|
Reef shark|3|blacktip reef shark,grey reef shark,gray reef shark,caribbean reef shark,whitetip reef shark
Megalodon|2.5|
Blue shark|2|
Basking shark|1.5|
Lemon shark|1.2|
Goblin shark|1|
Thresher shark|0.8|thresher
Leopard shark|0.6|
Blacktip shark|0.5|blacktip
Greenland shark|0.5|
0.3|Angel shark;Sand tiger shark/sand tiger/grey nurse shark/ragged tooth shark;Zebra shark;Wobbegong/carpet shark;Oceanic whitetip/oceanic whitetip shark;Megamouth shark/megamouth
0.15|Cookiecutter shark/cookie cutter shark;Frilled shark;Porbeagle;Dogfish/spiny dogfish;Sawshark/saw shark;Bonnethead/bonnethead shark;Spinner shark;Silky shark;Salmon shark;Horn shark;Epaulette shark/walking shark;Port Jackson shark
0.05|Sixgill shark/bluntnose sixgill;Sevengill shark/broadnose sevengill;Dusky shark;Sandbar shark;Bamboo shark;Catshark/cat shark;Swell shark;Galapagos shark;Silvertip shark;Copper shark/bronze whaler;School shark/tope;Lantern shark/dwarf lanternshark;Pyjama shark
0.02|Pocket shark;Viper dogfish;Kitefin shark;Crocodile shark;Bramble shark;Winghead shark;Daggernose shark;Tasselled wobbegong;Nervous shark;Milk shark;Speartooth shark;Ganges shark
`,
  },
  {
    id: 'cetaceans',
    q: 'Name a whale or dolphin',
    a: `
Blue whale|28|
Orca|18|killer whale
Humpback whale|15|humpback
Bottlenose dolphin|10|dolphin,bottlenose,common bottlenose dolphin
Sperm whale|8|
Beluga|6|beluga whale,white whale
Narwhal|4|
Grey whale|2.5|gray whale
Right whale|1.5|north atlantic right whale,southern right whale
Minke whale|1.2|minke
Fin whale|1|finback
Bowhead whale|0.8|bowhead
Pilot whale|0.8|
Porpoise|0.8|harbour porpoise,harbor porpoise
Spinner dolphin|0.5|
0.3|Common dolphin;Sei whale;Pink river dolphin/amazon river dolphin/boto/pink dolphin;Vaquita;False killer whale;Risso's dolphin
0.15|Dusky dolphin;Hector's dolphin;Commerson's dolphin;Spotted dolphin/atlantic spotted dolphin/pantropical spotted dolphin;Striped dolphin;Bryde's whale;Pygmy sperm whale;Cuvier's beaked whale/beaked whale;Irrawaddy dolphin;Finless porpoise;Dall's porpoise
0.05|Baiji/yangtze river dolphin;Ganges river dolphin/south asian river dolphin/susu;Melon-headed whale;Pygmy killer whale;Rough-toothed dolphin;White-beaked dolphin;Pacific white-sided dolphin;Atlantic white-sided dolphin;Hourglass dolphin;Peale's dolphin;Fraser's dolphin;Clymene dolphin;Tucuxi;Maui dolphin;Omura's whale;Rice's whale;Pygmy right whale;Dwarf sperm whale;Northern bottlenose whale;Baird's beaked whale;Blainville's beaked whale;Sowerby's beaked whale;Burmeister's porpoise;Spectacled porpoise;Australian snubfin dolphin/snubfin dolphin;Humpback dolphin;Right whale dolphin;La Plata dolphin/franciscana
`,
  },
  {
    id: 'seas',
    q: 'Name a sea or an ocean',
    a: `
Pacific Ocean|22|pacific
Atlantic Ocean|20|atlantic
Mediterranean Sea|12|mediterranean,med
Indian Ocean|8|
Caribbean Sea|6|caribbean
Arctic Ocean|5|arctic
Dead Sea|5|
Red Sea|4|
Black Sea|4|
North Sea|3|
Southern Ocean|2|antarctic ocean
Baltic Sea|2|baltic
Caspian Sea|1.5|caspian
Arabian Sea|1|
South China Sea|1|
Bering Sea|0.8|bering
Aegean Sea|0.8|aegean
Sea of Japan|0.6|japan sea,east sea
Adriatic Sea|0.6|adriatic
Coral Sea|0.5|
Tasman Sea|0.5|tasman
Irish Sea|0.4|
0.3|Sargasso Sea/sargasso;Sea of Galilee/galilee;Yellow Sea;East China Sea;Ionian Sea/ionian;Philippine Sea;Aral Sea/aral;Norwegian Sea;Gulf of Mexico;Persian Gulf/arabian gulf;Hudson Bay;Bay of Bengal
0.1|Tyrrhenian Sea/tyrrhenian;Barents Sea/barents;Sea of Okhotsk/okhotsk;Andaman Sea/andaman;Java Sea;Timor Sea;Arafura Sea/arafura;Celtic Sea;Labrador Sea;Beaufort Sea/beaufort;Greenland Sea;Weddell Sea/weddell;Ross Sea;Sea of Marmara/marmara;Sea of Azov/azov;Ligurian Sea/ligurian;Sulu Sea;Celebes Sea/celebes;Banda Sea;Kara Sea;White Sea;Salish Sea/salish;Sea of Cortez/gulf of california;Wadden Sea/wadden
0.03|Laptev Sea/laptev;East Siberian Sea;Chukchi Sea/chukchi;Scotia Sea;Alboran Sea/alboran;Balearic Sea;Solomon Sea;Bismarck Sea;Molucca Sea;Flores Sea;Savu Sea;Bali Sea;Bohai Sea/bohai;Seto Inland Sea;Lincoln Sea;Amundsen Sea;Bellingshausen Sea;Davis Sea;Koro Sea;Visayan Sea;Sibuyan Sea;Bohol Sea;Libyan Sea;Levantine Sea;Thracian Sea;Sea of Crete;Irminger Sea;Pechora Sea;Sea of the Hebrides
`,
  },
  {
    id: 'rivers',
    q: 'Name a river',
    a: `
Nile|25|river nile
Amazon|22|amazon river
Mississippi|12|
Thames|6|
Yangtze|4|chang jiang
Danube|3|
Ganges|3|ganga
Rhine|2.5|
Seine|2.5|
Colorado|2|colorado river
Missouri|1.5|
Congo|1.5|congo river,zaire
Mekong|1.2|
Hudson|1.2|
Euphrates|1|
Tigris|1|
Volga|0.8|
Indus|0.8|
Yellow River|0.8|huang he,huanghe
Rio Grande|0.8|
Jordan|0.6|river jordan
Zambezi|0.5|
Niger|0.5|
Columbia|0.5|
Murray|0.4|murray river
0.3|Tiber;Loire;Rhone;Elbe;Po;Ohio;St. Lawrence/saint lawrence;Yukon;Orinoco;Parana;Brahmaputra;Irrawaddy/ayeyarwady;Tagus/tejo;Douro;Ebro;Severn;Shannon;Potomac;Mackenzie;Limpopo;Orange River;Darling;Snake River;Tennessee;Arkansas;Amur;Lena;Ob;Yenisei;Dnieper/dnipro;Don;Vistula;Oder;Moselle;Tyne;Mersey;Clyde;Avon;Trent
0.1|Rubicon;Garonne;Dordogne;Marne;Meuse;Scheldt;Weser;Neckar;Drava;Sava;Tisza;Dniester;Ural;Kama;Neva;Guadalquivir;Arno;Adige;Liffey;Spree;Vltava/moldau;Platte;Red River;Sacramento;Willamette;Susquehanna;Delaware;Connecticut;Charles;Fraser;Ottawa;Saskatchewan;Magdalena;Sao Francisco;Uruguay;Paraguay;Madeira;Rio Negro;Xingu;Tocantins;Okavango;Senegal;Volta;Blue Nile;White Nile;Kasai;Ubangi;Salween;Chao Phraya;Pearl River/zhujiang;Kolyma;Syr Darya;Amu Darya/oxus;Helmand;Godavari;Krishna;Yamuna/jumna;Narmada;Kaveri/cauvery;Murrumbidgee;Waikato;Clutha;Sepik
`,
  },
  {
    id: 'lakes',
    q: 'Name a lake',
    a: `
Lake Michigan|14|michigan
Lake Superior|12|superior
Lake Erie|8|erie
Loch Ness|8|
Lake Tahoe|7|tahoe
Lake Victoria|6|victoria
Lake Ontario|5|ontario
Lake Huron|4|huron
Great Salt Lake|3|salt lake
Lake Titicaca|3|titicaca
Lake Baikal|3|baikal
Lake Geneva|2.5|geneva,lac leman
Lake Como|2.5|como
Caspian Sea|1.5|caspian
Lake Tanganyika|1.2|tanganyika
Crater Lake|1.2|
Lake Placid|1|
Dead Sea|1|
Lake Garda|0.8|garda
Lake Mead|0.8|mead
Windermere|0.8|lake windermere
Loch Lomond|0.8|
Lake Malawi|0.6|malawi,lake nyasa
Lake Champlain|0.6|champlain
Lake Powell|0.5|
Lake Okeechobee|0.5|okeechobee
Lake Louise|0.5|
0.3|Great Bear Lake;Great Slave Lake;Lake Winnipeg/winnipeg;Lake Nicaragua;Lake Maracaibo/maracaibo;Lake Chad/chad;Lake Turkana/turkana;Lake Albert;Lake Kivu/kivu;Lake Nasser/nasser;Lake Tana;Lake Volta;Aral Sea;Lake Ladoga/ladoga;Lake Constance/bodensee/constance;Lake Maggiore/maggiore;Lake Lucerne/lucerne;Lake Zurich;Lake Balaton/balaton;Lake Bled/bled;Sea of Galilee/lake tiberias/kinneret;Lake Taupo/taupo;Lake Eyre/kati thanda;Mono Lake;Lake Havasu/havasu;Yellowstone Lake;Lake George;Lake Pontchartrain/pontchartrain;Walden Pond;Moraine Lake
0.05|Lake Balkhash/balkhash;Lake Onega/onega;Lake Ohrid/ohrid;Lough Neagh;Ullswater;Derwentwater/derwent water;Coniston Water/coniston;Lake Vanern/vanern;Lake Vattern/vattern;Lake Inari;Lake Saimaa/saimaa;Lake Peipus;Lake Van;Lake Urmia;Qinghai Lake/qinghai;Dal Lake;Lake Toba/toba;Tonle Sap;Inle Lake/inle;West Lake;Lake Biwa/biwa;Lake Kawaguchi/kawaguchiko;Lake Wakatipu/wakatipu;Lake Tekapo/tekapo;Lake Wanaka/wanaka;Lake Hillier;Lake Argyle;Lake Atitlan/atitlan;Lake Chapala;Lake Poopo;Lake Vostok/vostok;Flathead Lake;Lake Winnipesaukee/winnipesaukee;Seneca Lake;Cayuga Lake;Lake of the Ozarks;Lake Washington;Lake Chelan;Lake Minnetonka;Lake Nipigon;Lake Athabasca/athabasca;Lake Okanagan/okanagan;Lake Natron/natron;Lake Nakuru/nakuru;Lake Naivasha;Lake Kariba/kariba;Lake Retba/lac rose;Lake Assal;Issyk-Kul/issyk kul;Lake Sevan/sevan;Pangong Lake/pangong tso;Lake Manasarovar;Namtso;Plitvice Lakes/plitvice;Konigssee;Lake Annecy/annecy;Lake Trasimeno;Lake Orta;Lake Iseo;Lake Lugano/lugano;Lake Neuchatel;Lake Thun;Lake Brienz;Wolfgangsee;Lake Skadar/shkoder;Lake Prespa;Lake Pichola;Chilika Lake
`,
  },
  {
    id: 'fish-eat',
    q: 'Name a fish people eat',
    a: `
Salmon|28|
Tuna|22|
Cod|10|
Tilapia|5|
Trout|4|rainbow trout
Haddock|3|
Sardine|3|pilchard
Catfish|2.5|
Halibut|2.5|
Sea bass|2.5|bass,seabass,branzino
Mackerel|2|
Anchovy|1.5|anchovies
Swordfish|1.5|
Mahi-mahi|1.5|mahi mahi,dorado,dolphinfish
Herring|1.2|
Snapper|1.2|red snapper
Flounder|1|
Sole|0.8|dover sole
Carp|0.8|
Pollock|0.8|pollack
Eel|0.8|unagi
Grouper|0.6|
Perch|0.5|
Pike|0.4|
Monkfish|0.4|
0.3|Walleye;Plaice;Turbot;Sea bream/bream/dorade;Barramundi;Whiting;Hake;Skate;Pufferfish/fugu/blowfish;Yellowtail/hamachi;Bluefish;Sturgeon;Arctic char/char;Pompano;Mullet/red mullet;Smelt;Whitebait;Kingfish;Wahoo/ono;Orange roughy;John Dory;Basa/pangasius/swai;Marlin;Bonito;Sablefish/black cod;Chilean sea bass/patagonian toothfish;Rockfish;Shark
0.1|Lingcod;Shad;Sprat;Crappie;Bluegill;Zander/pike perch;Tench;Milkfish/bangus;Hilsa/ilish;Pomfret;Croaker;Red drum/redfish;Tilefish;Opah/moonfish;Escolar;Cobia;Amberjack;Hoki;Gurnard;Coley/saithe;Ling;Garfish;Lamprey;Sea robin;Butterfish;Scup/porgy;Tautog;Weakfish;Snook;Tarpon;Barracuda;Parrotfish;Lionfish;Wolffish;Cusk;Burbot;Grayling;Whitefish;Cisco;Capelin;Saury/sanma;Sweetfish/ayu;Loach;Snakehead;Rohu;Catla
`,
  },
  {
    id: 'aquarium',
    q: "Name a fish you'd keep in an aquarium",
    a: `
Goldfish|40|
Betta|12|siamese fighting fish,betta fish,fighting fish
Guppy|10|
Clownfish|8|nemo
Angelfish|5|
Neon tetra|4|tetra
Koi|3|
Molly|2|mollies
Blue tang|2|dory,regal tang,tang
Pleco|1.5|plecostomus,suckerfish,sucker fish
Oscar|1.2|
Discus|1|
Zebrafish|1|zebra danio,danio
Platy|0.8|
Swordtail|0.8|
Catfish|0.8|corydoras,cory catfish,cory
Seahorse|0.8|
Pufferfish|0.6|puffer
Gourami|0.6|
Cichlid|0.6|
Loach|0.4|clown loach,kuhli loach
0.3|Barb/tiger barb/cherry barb;Rasbora/harlequin rasbora;Piranha;Arowana;Lionfish;Butterflyfish;Goby;Damselfish;Wrasse;Yellow tang;Mandarin fish/mandarinfish/mandarin dragonet;Killifish;Rainbowfish;Hatchetfish;Cardinal tetra;Minnow/white cloud minnow;Moray eel/eel;Bala shark/rainbow shark/shark;Stingray
0.1|Pearl gourami;Dwarf gourami;Bristlenose pleco/bristlenose;Otocinclus/oto;Flowerhorn;Ram cichlid/german blue ram/ram;Endler/endlers livebearer;Blenny;Firefish;Royal gramma;Triggerfish;Boxfish/cowfish;Hawkfish;Anthias;Cardinalfish/banggai cardinalfish;Pencilfish;Glass catfish;Pictus catfish;African butterfly fish;Elephantnose fish;Bichir;Black ghost knifefish/knifefish;Archerfish;Mudskipper;Paradise fish;Ember tetra;Rummy nose tetra/rummynose tetra;Black skirt tetra;Glofish;Comet goldfish/comet;Shubunkin;Oranda;Ryukin;Black moor;Bubble eye;Convict cichlid;Jack Dempsey;Severum;Kribensis;Pea puffer
`,
  },
  {
    id: 'shells',
    q: 'Name a sea creature with a shell',
    a: `
Crab|25|
Sea turtle|20|turtle
Lobster|10|
Clam|8|
Oyster|7|
Hermit crab|6|
Sea snail|5|snail
Mussel|3|
Shrimp|3|prawn
Scallop|2.5|
Conch|2|queen conch
Nautilus|1.5|
Barnacle|1|
Crayfish|0.8|crawfish,crawdad
Abalone|0.8|
Sea urchin|0.8|urchin
Horseshoe crab|0.6|
0.3|Cowrie/cowry;Whelk;Limpet;Periwinkle/winkle;Cockle;Geoduck;Krill;Giant clam;Hawksbill turtle/hawksbill;Leatherback turtle/leatherback;Loggerhead turtle/loggerhead;Green sea turtle/green turtle;Terrapin;King crab;Blue crab;Fiddler crab;Coconut crab;Spider crab/japanese spider crab;Dungeness crab;Langoustine/scampi;Mantis shrimp
0.1|Cone snail;Murex;Argonaut/paper nautilus;Chiton;Razor clam;Quahog;Sand dollar;Tusk shell;Pearl oyster;Olive ridley turtle/olive ridley;Kemp's ridley turtle/kemps ridley;Flatback turtle;Slipper lobster;Spiny lobster/rock lobster;Squat lobster;Yeti crab;Decorator crab;Pea crab;Ghost crab;Stone crab;Snow crab;Copepod;Amphipod;Giant isopod/isopod;Sea butterfly/pteropod;Top shell;Turban shell;Moon snail;Wentletrap;Nerite;Auger shell;Junonia;Lightning whelk;Tulip shell
`,
  },
  {
    id: 'waterbirds',
    q: 'Name a seabird or water bird',
    a: `
Seagull|30|gull,herring gull
Penguin|18|emperor penguin
Pelican|12|
Duck|8|mallard
Albatross|6|
Swan|5|
Puffin|4|
Flamingo|3|
Heron|2.5|great blue heron,grey heron
Goose|2|geese,canada goose
Cormorant|1.5|shag
Osprey|1|
Tern|1|arctic tern
Kingfisher|0.8|
Stork|0.6|
Egret|0.6|
Sandpiper|0.5|
Loon|0.5|diver
Frigatebird|0.4|frigate bird
0.3|Booby/blue-footed booby/blue footed booby;Gannet;Petrel/storm petrel;Crane;Ibis;Spoonbill;Oystercatcher;Plover;Coot;Moorhen;Grebe;Skua;Shearwater;Kittiwake;Guillemot/murre;Razorbill;Auk/little auk;Avocet;Curlew;Sea eagle/bald eagle/white-tailed eagle;Fulmar
0.1|Tropicbird;Black skimmer/skimmer;Anhinga/snakebird/darter;Bittern;Rail;Godwit;Turnstone;Dunlin;Sanderling;Redshank;Phalarope;Eider;Merganser;Teal;Wigeon;Pintail;Shoveler;Shelduck;Scoter;Goldeneye;Bufflehead;Dipper;Jacana;Limpkin;Shoebill;Hamerkop;Stilt;Murrelet;Auklet;Prion;Noddy;Jaeger;Wood duck;Mandarin duck;Muscovy duck;Black swan;Mute swan;Snow goose;Barnacle goose;Brent goose/brant;Gentoo penguin/gentoo;Adelie penguin/adelie;Chinstrap penguin/chinstrap;King penguin;Macaroni penguin;Rockhopper penguin/rockhopper;Little penguin/fairy penguin;Galapagos penguin;African penguin;Magellanic penguin
`,
  },
  {
    id: 'beach',
    q: "Name something you'd find on a beach",
    a: `
Sand|30|
Seashell|18|shell,sea shell
Towel|6|beach towel
Umbrella|5|beach umbrella,parasol
Crab|5|
Sandcastle|4|sand castle
Seaweed|4|kelp
Water|3|ocean,sea,the sea,waves,wave
Seagull|3|gull,bird
Beach ball|2.5|ball
Sunscreen|2|sun cream,suncream,sunblock,sun lotion
Lifeguard|2|lifeguard tower,lifeguard chair
Surfboard|1.5|
Rocks|1.5|pebbles,stones
People|1.5|sunbathers,swimmers,tourists
Bucket|1.2|bucket and spade,pail
Starfish|1.2|sea star
Driftwood|1|
Sunglasses|1|
Jellyfish|0.8|
Flip-flops|0.8|flip flops,sandals,thongs
Deck chair|0.8|beach chair,sun lounger,lounger,chair
Palm tree|0.8|
Swimsuit|0.6|bikini,trunks,swimming trunks,bathing suit
Spade|0.5|shovel
Boat|0.5|
Sea glass|0.4|beach glass
0.3|Volleyball net/volleyball;Pier;Dunes/sand dune;Cooler/esky/cool box;Kite;Frisbee;Footprints;Tide pool/rock pool;Ice cream;Sunhat/hat;Litter/trash/rubbish/plastic;Dog;Fishing rod;Boardwalk;Beach hut;Hammock;Snorkel;Bonfire/campfire/fire pit;Surfer;Buoy;Lighthouse
0.1|Windbreak;Message in a bottle/bottle;Coconut;Sand dollar;Sea turtle/turtle;Seal;Metal detector;Jet ski;Kayak;Paddleboard;Tent;Picnic;Speaker/radio;Book;Cliffs;Coral;Sandbar;Anchor;Fishing net/net;Seafoam/foam;Sand flea/sandhopper;Mermaid's purse;Cuttlebone;Shipwreck;Tar ball;Wrack line
`,
  },
  {
    id: 'boats',
    q: 'Name a type of boat or ship',
    a: `
Sailboat|18|sailing boat,sail boat
Yacht|12|
Canoe|8|
Cruise ship|8|cruise liner,ocean liner,liner
Kayak|6|
Speedboat|6|motorboat,motor boat,powerboat
Rowboat|5|rowing boat,row boat
Ferry|5|
Submarine|4|
Fishing boat|4|trawler
Tugboat|3|tug
Pirate ship|2.5|
Battleship|2|warship
Aircraft carrier|2|carrier
Raft|1.5|
Cargo ship|1.5|container ship,freighter
Catamaran|1.5|
Dinghy|1.2|
Gondola|1|
Pontoon|0.8|pontoon boat
Jet ski|0.8|
Houseboat|0.8|
Tanker|0.6|oil tanker,supertanker
Lifeboat|0.6|
Steamboat|0.5|paddle steamer,steamship,riverboat,paddle boat
Barge|0.5|narrowboat,canal boat
Schooner|0.4|
0.3|Galleon;Destroyer;Frigate;Hovercraft;Longship/viking ship/longboat;Trimaran;Sloop;Clipper;Icebreaker;Pedalo/pedal boat;Airboat;Junk;Dhow;Skiff;Punt;Dory;Ketch;Cutter;Brig;Corvette;Cruiser;Hydrofoil;Dragon boat;Outrigger/outrigger canoe;Zodiac/inflatable/rib;Paddleboard
0.1|Bass boat;Jon boat;Trireme;Caravel;Carrack;Man-of-war/man o war;Brigantine;Yawl;Coracle;Umiak;Sampan;Felucca;Whaler/whaling ship;Lightship;Minesweeper;Dreadnought;U-boat/uboat;Research vessel;Bulk carrier;Car carrier/ro-ro;Dredger;Fireboat;Pilot boat;Water taxi;Vaporetto;Banana boat;Wherry;Scow;Lugger;Xebec;Barque/bark;Barquentine;Pinnace;Cog;Knarr;Proa;Waka;Pirogue;Bireme;Galley;Tender;Gig;Jolly boat;Shikara
`,
  },
  {
    id: 'watersports',
    q: 'Name a water sport',
    a: `
Swimming|28|
Surfing|20|
Water polo|8|
Diving|6|high diving,springboard diving
Water skiing|5|waterskiing
Sailing|5|
Kayaking|4|
Rowing|3.5|
Scuba diving|3|scuba
Snorkeling|2.5|snorkelling
Canoeing|2|
Jet skiing|2|
Wakeboarding|1.5|
Windsurfing|1.5|
Paddleboarding|1.5|stand up paddleboarding,sup,paddle boarding
Synchronized swimming|1|artistic swimming,synchronised swimming
Kitesurfing|1|kiteboarding,kite surfing
Rafting|0.8|white water rafting,whitewater rafting
Fishing|0.8|
Bodyboarding|0.6|boogie boarding
Water aerobics|0.4|aqua aerobics
0.3|Parasailing;Freediving/free diving;Dragon boat racing/dragon boating;Tubing;Wakesurfing;Open water swimming;Triathlon;Powerboat racing/powerboating;Yachting;Skimboarding;Cliff diving;Kneeboarding;Bodysurfing
0.1|Underwater hockey/octopush;Canyoning;Flyboarding;Wing foiling/foiling/hydrofoiling;Spearfishing;Water volleyball;Coasteering;Surf lifesaving;Underwater rugby;Canoe polo;Water basketball;Finswimming;Barefoot skiing;Sculling;Outrigger canoeing;Log rolling/birling;Water jousting;River surfing;Ice swimming;Noodling
`,
  },
  {
    id: 'ships',
    q: 'Name a famous ship, real or made up',
    a: `
Titanic|45|rms titanic
Mayflower|8|
Black Pearl|7|
Santa Maria|4|
Queen Mary|3|queen mary 2
Bismarck|2.5|
Lusitania|2.5|
HMS Victory|2|victory
Cutty Sark|1.5|
USS Enterprise|1.5|enterprise
Endurance|1.5|
HMS Beagle|1.2|beagle
Bounty|1.2|hms bounty
Noah's Ark|1.2|ark
Nina|1|la nina
Pinta|1|la pinta
Flying Dutchman|1|
Golden Hind|0.8|golden hinde
Mary Rose|0.8|
Queen Anne's Revenge|0.8|
USS Arizona|0.6|arizona
Yamato|0.5|
Britannic|0.5|
Olympic|0.5|rms olympic
0.3|Mary Celeste;USS Constitution/old ironsides;USS Missouri;Calypso;Kon-Tiki/kon tiki;Rainbow Warrior;Exxon Valdez;Andrea Doria;Edmund Fitzgerald;Queen Elizabeth 2/qe2/queen elizabeth;Vasa;Argo;Pequod;Nautilus;Jolly Roger;Going Merry;Thousand Sunny;Carpathia;HMS Hood/hood;Ever Given
0.1|General Belgrano/belgrano;Batavia;HMS Endeavour/endeavour;RRS Discovery/discovery;Fram;SS Great Eastern/great eastern;SS Great Britain;USS Maine;Battleship Potemkin/potemkin;USS Monitor/monitor;CSS Virginia/merrimack;USS Indianapolis/indianapolis;USS Lexington;USS Yorktown;USS Hornet;USS Nimitz/nimitz;HMS Ark Royal/ark royal;HMS Dreadnought/dreadnought;HMS Terror/terror;HMS Erebus/erebus;Victoria/nao victoria;Half Moon/halve maen;La Amistad/amistad;Essex;Wilhelm Gustloff;Poseidon;Orca;Pacific Princess/love boat;SS Minnow/minnow;Dawn Treader;Hispaniola;Red October;African Queen;Costa Concordia;MS Estonia;Empress of Ireland;SS Normandie/normandie;SS United States;HMS Resolution/resolution;Adventure Galley;Whydah;Royal Fortune
`,
  },
  {
    id: 'pirates',
    q: 'Name a pirate, real or made up',
    a: `
Blackbeard|30|edward teach,edward thatch
Jack Sparrow|28|captain jack sparrow
Captain Hook|12|hook
Long John Silver|5|
Captain Morgan|4|henry morgan
Luffy|3|monkey d luffy
Davy Jones|2.5|
Anne Bonny|2|
Barbossa|2|hector barbossa,captain barbossa
Captain Kidd|2|william kidd,kidd
Calico Jack|1.2|jack rackham,john rackham
Black Bart|1|bartholomew roberts
Mary Read|1|
Will Turner|0.8|
Francis Drake|0.8|sir francis drake,drake
Zoro|0.8|roronoa zoro
Elizabeth Swann|0.6|
Smee|0.6|mr smee
Barbarossa|0.5|redbeard,hayreddin barbarossa
Grace O'Malley|0.4|grainne mhaol,granuaile
0.3|Ching Shih/zheng yi sao/madame ching;Stede Bonnet;Henry Every/henry avery/long ben;Charles Vane;Edward Low/ned low;Black Sam Bellamy/sam bellamy/samuel bellamy;Jean Lafitte/lafitte;Dread Pirate Roberts/westley;Captain Flint/flint;Guybrush Threepwood/guybrush;LeChuck;One-Eyed Willy/one eyed willie;Captain Pugwash/pugwash;Edward Kenway;Nami;Sanji;Usopp;Shanks;Whitebeard;Buggy
0.1|Benjamin Hornigold/hornigold;Thomas Tew;William Dampier/dampier;Francois l'Olonnais/lolonnais;Piet Hein;Jeanne de Clisson;Sayyida al Hurra;Rachel Wall;Israel Hands;Black Caesar;Olivier Levasseur/la buse;Christopher Condent;Howell Davis;Edward England;John Hawkins;Thomas Cavendish;Henry Jennings;Hippolyte Bouchard;Roberto Cofresi/cofresi;Zheng Zhilong;Koxinga;Klaus Stortebeker/stortebeker;Eustace the Monk;Captain Blood/peter blood;Captain Harlock/harlock;Risky Boots;Captain Syrup;Elaine Marley;Patchy the Pirate/patchy;Captain Feathersword
`,
  },
  {
    id: 'bodies',
    q: 'Name a word for a body of water',
    a: `
Lake|22|
Ocean|20|
River|16|
Sea|10|
Pond|8|
Stream|5|
Creek|3|
Bay|2.5|
Lagoon|2|
Puddle|1.5|
Gulf|1.5|
Pool|1.2|swimming pool
Reservoir|1|
Canal|1|
Swamp|0.8|
Brook|0.6|
Strait|0.6|
Marsh|0.5|
Estuary|0.5|
Fjord|0.5|fiord
Waterfall|0.5|
Spring|0.4|hot spring
0.3|Bayou;Channel;Cove;Inlet;Harbor/harbour;Delta;Loch;Tarn;Sound;Basin;Bog;Wetland;Tributary;Rapids;Geyser;Oasis;Billabong;Moat
0.1|Aquifer;Rivulet;Rill;Burn;Beck;Firth;Mere;Lough;Slough;Fen;Mire;Wadi;Arroyo;Oxbow lake/oxbow;Tide pool/rock pool;Cenote;Kettle lake;Backwater;Narrows;Bight;Ria;Runnel;Freshet;Millpond;Watering hole/waterhole;Well;Lido;Dam;Sea loch
`,
  },
  {
    id: 'sea-movies',
    q: 'Name a film set at sea or underwater',
    a: `
Finding Nemo|25|nemo
Titanic|22|
Jaws|18|
The Little Mermaid|8|little mermaid
Moana|7|
Pirates of the Caribbean|6|curse of the black pearl
Finding Dory|3|
Aquaman|2|
Life of Pi|1.5|
Cast Away|1.2|castaway
Shark Tale|1.2|
Luca|1|
The Meg|1|meg
Avatar: The Way of Water|1|avatar 2,way of water,avatar the way of water,avatar
The SpongeBob SquarePants Movie|1|spongebob,spongebob movie,spongebob squarepants
Master and Commander|0.6|
The Perfect Storm|0.6|perfect storm
Waterworld|0.6|
Free Willy|0.6|
The Abyss|0.5|abyss
20,000 Leagues Under the Sea|0.5|20000 leagues under the sea,twenty thousand leagues under the sea
Captain Phillips|0.5|
Ponyo|0.5|
0.3|The Poseidon Adventure/poseidon;Das Boot;The Hunt for Red October/hunt for red october/red october;Crimson Tide;U-571;Deep Blue Sea;Open Water;The Shallows;47 Meters Down;Dunkirk;Mutiny on the Bounty;Moby Dick;The Life Aquatic/life aquatic with steve zissou/life aquatic;Splash;Atlantis: The Lost Empire/atlantis;Treasure Island;Muppet Treasure Island;Peter Pan;Hook;The Blue Lagoon/blue lagoon
0.1|Dead Calm;All Is Lost;Kon-Tiki;In the Heart of the Sea;Adrift;The Lighthouse;Overboard;Captain Ron;Speed 2/speed 2 cruise control;Under Siege;Battleship;Midway;Greyhound;K-19/k19 the widowmaker;Down Periscope;Leviathan;DeepStar Six;Sphere;Underwater;The Deep;Into the Blue;Fool's Gold;Blue Crush;Soul Surfer;Dolphin Tale;Flipper;Whale Rider;Song of the Sea;The Red Turtle;Black Sea;Triangle of Sadness;Ghost Ship;Deep Rising;Lifeboat;The Finest Hours;White Squall;My Octopus Teacher;Blackfish;The Cove;Seaspiracy;The Big Blue/le grand bleu;Thunderball;The Spy Who Loved Me;Yellow Submarine;The Shape of Water;Nyad;Sinbad
`,
  },
  {
    id: 'seafood',
    q: 'Name a seafood dish',
    a: `
Sushi|22|
Fish and chips|18|fish n chips
Shrimp cocktail|6|prawn cocktail
Paella|6|
Clam chowder|6|chowder
Lobster roll|4|
Calamari|4|fried calamari
Fish tacos|3.5|
Crab cakes|3|
Sashimi|3|
Ceviche|2.5|
Shrimp scampi|2.5|scampi
Fish sticks|2|fish fingers
Poke|2|poke bowl
Fried shrimp|1.5|popcorn shrimp,coconut shrimp
Tempura|1.2|shrimp tempura,prawn tempura
Lobster bisque|1.2|bisque
Gumbo|1|seafood gumbo
Oysters|1|raw oysters,oysters rockefeller
Tuna salad|0.8|tuna sandwich,tuna melt
Bouillabaisse|0.8|
Fish pie|0.6|
Mussels|0.6|moules frites,moules mariniere
Smoked salmon|0.6|lox,gravlax
Surf and turf|0.5|
Jambalaya|0.5|
Cioppino|0.4|
0.3|Grilled salmon/salmon;Fish curry;Fish soup;Shrimp and grits;Crab legs;Lobster thermidor;Seafood pasta/linguine alle vongole/spaghetti alle vongole/seafood linguine;Seafood risotto;Fish burger/filet-o-fish/fish sandwich;Tuna tartare;Fish cakes/fishcakes;Crawfish boil/seafood boil;Po' boy/po boy/shrimp po boy;Nigiri;California roll/maki/sushi roll;Fish stew;Fried fish/fish fry/fried catfish;Scallops/seared scallops;Caviar
0.1|Kedgeree;Kippers;Crawfish etouffee/etouffee;Clams casino;Fried clams;Seafood chowder;Chirashi;Unagi don/unadon;Takoyaki;Tom yum/tom yum goong;Laksa;Cullen skink;Jellied eels;Pickled herring/rollmops;Salt cod/bacalhau/bacalao/brandade;Grilled octopus/pulpo a la gallega/octopus;Fritto misto;Zarzuela;Moqueca;Aguachile;Shrimp fried rice;Chili crab/chilli crab;Salt and pepper squid;Honey walnut shrimp;Kung pao shrimp;Fish head curry;Sinigang;Kinilaw;Poisson cru;Lutefisk;Surstromming;Gefilte fish;Taramasalata;Crab rangoon;Shrimp toast/prawn toast;Fish balls;Haemul pajeon;Jjamppong;Stargazy pie;Arbroath smokie;Lobster newburg;Shrimp creole;Crab louie;Tuna casserole;Salmon en croute;Sole meuniere;Fish amok;Cha ca;Ikan bakar;Encebollado;Thieboudienne;Lobster mac and cheese
`,
  },
  {
    id: 'sea-monsters',
    q: 'Name a sea monster or mythical water creature',
    a: `
Kraken|28|
Loch Ness Monster|22|nessie,loch ness
Mermaid|14|merman,merfolk
Leviathan|6|
Godzilla|5|
Megalodon|4|
Siren|3|
Sea serpent|3|
Hydra|2.5|
Cthulhu|2|
Moby Dick|2|
Jaws|1.5|
Charybdis|1|
Scylla|1|
Selkie|0.8|
Kelpie|0.8|
Kappa|0.6|
Ursula|0.6|
0.3|Jormungandr/midgard serpent/world serpent;Cetus;Naga;Water nymph/nymph/naiad/nereid;Undine;Davy Jones;Giant squid;Tiamat;Dagon;Bunyip;Ogopogo;Champ/champy;Rusalka;Lorelei;Gyarados;Lapras;Kyogre;Creature from the Black Lagoon/gill-man/gillman;Sharktopus;Water horse
0.1|Each-uisge;Vodyanoy;Nixie/nix;Makara;Taniwha;Umibozu;Isonade;Ningyo;Aspidochelone;Hippocampus/hippocamp;Sea goat;Lusca;Iku-Turso;Hafgufa;Akkorokamui;Qalupalik;Mishipeshu;Encantado;Yacumama;Morgawr;Cadborosaurus/caddy;Deep one/deep ones;Sea hag;Sea witch;Dragon turtle;Grindylow;Merlion;Sea monk;Bake-kujira;Funayurei;Ryujin;Ceto;Rahab;Lotan;Bahamut;Zaratan;Fastitocalon;Devil whale;Nyami Nyami;Mami Wata;Inkanyamba;Ninki Nanka;Nahuelito;Storsjoodjuret;Stoor worm;Nuckelavee;Blue men of the Minch;Finfolk;Merrow;Afanc;Melusine;Abe Sapien
`,
  },
  {
    id: 'islands',
    q: 'Name an island',
    a: `
Hawaii|18|big island
Ireland|6|
Madagascar|6|
Iceland|6|
Great Britain|5|britain,uk,england
Australia|4|
Japan|4|honshu
Cuba|4|
Jamaica|4|
Bali|4|
Sicily|3|
Greenland|3|
Manhattan|2.5|
Puerto Rico|2|
Bahamas|2|
Fiji|2|
Maui|2|
Tasmania|1.5|
New Zealand|1.5|
Sri Lanka|1.2|ceylon
Crete|1.2|
Bermuda|1|
Galapagos|1|galapagos islands
Easter Island|1|rapa nui
Long Island|1|
Oahu|1|
Tahiti|1|
Borneo|0.8|
Malta|0.8|
Cyprus|0.8|
Ibiza|0.8|
Alcatraz|0.8|
Santorini|0.8|
Taiwan|0.6|formosa
Singapore|0.6|
Corsica|0.6|
Sardinia|0.6|
Mallorca|0.6|majorca
Barbados|0.5|
Maldives|0.5|
Bora Bora|0.5|
Guam|0.4|
0.3|Sumatra;Java;Vancouver Island;Newfoundland;Hispaniola;Kauai;Zanzibar;Mauritius;Seychelles;Phuket;Capri;Mykonos;Corfu;Rhodes;Tenerife;Gran Canaria;Lanzarote;Madeira;Azores;Isle of Man;Isle of Wight;Isle of Skye/skye;Jersey;Guernsey;Aruba;Trinidad;Tobago;Saint Lucia/st lucia;Antigua;Grenada;Key West;Staten Island;Ellis Island;Nantucket;Martha's Vineyard;Okinawa;Hokkaido;Samoa;Tonga
0.1|Dominica;Martinique;Guadeloupe;Curacao;Bonaire;Grand Cayman/cayman islands;Catalina/santa catalina;Kodiak;Baffin Island/baffin;Prince Edward Island/pei;Cape Breton;Kyushu;Shikoku;Jeju;Hainan;Hong Kong Island/hong kong;Luzon;Mindanao;Boracay;Palawan;Sulawesi/celebes;New Guinea/papua;Timor;Lombok;Komodo;Vanuatu;New Caledonia;Rarotonga;Pitcairn;Midway;Wake Island;Iwo Jima;Saipan;Svalbard/spitsbergen;Faroe Islands/faroes;Shetland;Orkney;Isle of Lewis/lewis;Anglesey;Lindisfarne/holy island;Gotland;Elba;Ischia;Lampedusa;Menorca/minorca;Formentera;Hvar;Naxos;Paros;Zakynthos/zante;Kefalonia/cephalonia;Lesbos;Kos;Socotra;Bahrain;Reunion;Comoros;Sao Tome;Saint Helena/st helena;Ascension Island/ascension;Tristan da Cunha;Falkland Islands/falklands;South Georgia;Tierra del Fuego;Chiloe;Roatan;Cozumel;Isla Mujeres;Sakhalin;Ellesmere Island/ellesmere;Kangaroo Island;K'gari/fraser island;Rottnest Island/rottnest;Lord Howe Island;Norfolk Island;Stewart Island;Waiheke;Christmas Island;Diego Garcia;Kiribati;Tuvalu;Nauru;Palau;Bikini Atoll;Molokai;Lanai;Robben Island;Devil's Island
`,
  },
  {
    id: 'scuba',
    q: 'Name something a scuba diver uses',
    a: `
Tank|28|oxygen tank,air tank,scuba tank,cylinder,oxygen,air
Mask|20|goggles,dive mask,diving mask
Fins|16|flippers
Wetsuit|14|wet suit
Snorkel|6|
Regulator|4|mouthpiece
Weight belt|2.5|weights,weight
Flashlight|1.5|torch,dive light
Dive computer|1.2|computer
Camera|1|underwater camera,gopro
Knife|1|dive knife
BCD|0.8|buoyancy control device,buoyancy compensator,vest
Gloves|0.6|
Watch|0.6|dive watch
Depth gauge|0.5|gauge,pressure gauge
Compass|0.5|
Boat|0.4|dive boat
0.3|Drysuit/dry suit;Boots/booties/dive boots;Hood;Surface marker buoy/buoy/smb;Rebreather;Speargun/spear gun;Dive flag/flag;Dive slate/slate;Reel;Rope/line;Whistle;Underwater scooter/scooter/dpv
0.1|Lift bag;Mesh bag/catch bag/bag;Spare regulator/octopus;Hose;Nitrox;Logbook/dive log;Anchor;Ladder;Shark cage/cage;Rash guard;Defog/anti-fog;Tank banger;Reef hook;Pointer stick;Dive tables/dive table;Helmet;Full face mask;Pony bottle;Trimix;Carabiner;Lanyard;Shears/trauma shears;Strobe/marker light;Signal mirror;Dive bag
`,
  },
];
