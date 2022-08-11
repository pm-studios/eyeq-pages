import React from 'react';
import Cookies from 'universal-cookie';

const GameAPI = {
  games: [
    {
      id: 1,
      slug: "phantom-doctrine--1",
      title: "Phantom Doctrine",
      img_cover: "oaov1veblnyapulbcfdb",
      releaseDate: "14th Aug, 2018",
      developer: "CreativeForge Games",
      platforms: "PlayStation 4,Xbox One,Steam",
      categories: "RPG,Strategy,Tactical,Action,Fantasy,Thriller",
      tags: "alternate,historical,coldwar,paxwest2017,turn-based",
      youtube: "1W6vC3Z6DfI",
      img_screenshots: "a5orrdieqhwtijmvztyx,gx6pjkgyfeyunqryyhon,lrydepllxfvjwfnmcspw",
      released_at: "1976-04-19T12:59-0500",
      summary: "Starring one of the world’s most iconic Super Heroes, Marvel’s Spider-Man features the acrobatic abilities, improvisation and web-slinging that the wall-crawler is famous for, while also introducing elements never-before-seen in a Spider-Man game. Mix and match a varied set of evolved combat mechanics, including melee, aerial combat, webs, stealth, and unique high-tech gadgets that highlight Spider-Man’s boundless acrobatic agility and active combat style. Sony Interactive Entertainment, Insomniac Games, and Marvel have teamed up to create a brand-new and authentic Spider-Man adventure.",
      similar_games: [],
      dlc_games: []
    },
    {
      id: 2,
      slug: "adventure-time-pirates-of-the-enchiridion",
      title: "Adventure Time: Pirates Of The Enchiridion",
      img_cover: "obqa2nxm0gocmm0qwec5",
      releaseDate: "17th Jul, 2018",
      developer: "Climax Studios",
      platforms: "Nintendo Switch,Xbox One,Steam,PlayStation 4",
      categories: "Adventure,RPG,Action,Open World",
      tags: "fantasy",
      youtube: "GtUAC37OdSo",
      img_screenshots: "x9sspbdmp8tuiwtsgeou,ljz3hwmj8vcxsaa2hekj,bdzom7ytf1ssjj9hj1ne",
      released_at: "1976-04-19T12:59-0500",
      summary: "Starring one of the world’s most iconic Super Heroes, Marvel’s Spider-Man features the acrobatic abilities, improvisation and web-slinging that the wall-crawler is famous for, while also introducing elements never-before-seen in a Spider-Man game. Mix and match a varied set of evolved combat mechanics, including melee, aerial combat, webs, stealth, and unique high-tech gadgets that highlight Spider-Man’s boundless acrobatic agility and active combat style. Sony Interactive Entertainment, Insomniac Games, and Marvel have teamed up to create a brand-new and authentic Spider-Man adventure.",
      similar_games: [],
      dlc_games: []
    },
    {
      id: 3,
      slug: "football-manager-2019",
      title: "Football Manager 2019",
      img_cover: "co1h6j",
      releaseDate: "2nd Nov, 2018",
      developer: "Sports Interactive",
      platforms: "Steam",
      categories: "Simulator,Sport",
      tags: "football,management,simulator",
      youtube: "66-BT930evI",
      img_screenshots: "sc5j13,sc5j12,sc5j11",
      released_at: "1976-04-19T12:59-0500",
      summary: "Starring one of the world’s most iconic Super Heroes, Marvel’s Spider-Man features the acrobatic abilities, improvisation and web-slinging that the wall-crawler is famous for, while also introducing elements never-before-seen in a Spider-Man game. Mix and match a varied set of evolved combat mechanics, including melee, aerial combat, webs, stealth, and unique high-tech gadgets that highlight Spider-Man’s boundless acrobatic agility and active combat style. Sony Interactive Entertainment, Insomniac Games, and Marvel have teamed up to create a brand-new and authentic Spider-Man adventure.",
      similar_games: [],
      dlc_games: []
    },
    {
      id: 4,
      slug: "red-dead-redemption-2",
      title: "Red Dead Redemption 2",
      img_cover: "yfk9f2lbo0r7slytuhra",
      releaseDate: "26th Oct, 2018",
      developer: "Rockstar Studios",
      platforms: "PlayStation 4,Xbox One",
      categories: "RPG,Adventure,Shooter,Action,Open world",
      tags: "action-adventure,cowboy,horse,western",
      youtube: "94B-38sX5fs",
      img_screenshots: "mptosgjarjlyqxy7lqsm,dorsz0jbcecmkxvzi3t8,banftd8fgfytbsfx6mjz",
      released_at: "1976-04-19T12:59-0500",
      summary: "Starring one of the world’s most iconic Super Heroes, Marvel’s Spider-Man features the acrobatic abilities, improvisation and web-slinging that the wall-crawler is famous for, while also introducing elements never-before-seen in a Spider-Man game. Mix and match a varied set of evolved combat mechanics, including melee, aerial combat, webs, stealth, and unique high-tech gadgets that highlight Spider-Man’s boundless acrobatic agility and active combat style. Sony Interactive Entertainment, Insomniac Games, and Marvel have teamed up to create a brand-new and authentic Spider-Man adventure.",
      similar_games: [],
      dlc_games: []
    },
    {
      id: 5,
      slug: "phantom-doctrine--1",
      title: "Phantom Doctrine",
      img_cover: "oaov1veblnyapulbcfdb",
      releaseDate: "14th Aug, 2018",
      developer: "CreativeForge Games",
      platforms: "PlayStation 4,Xbox One,Steam",
      categories: "RPG,Strategy,Tactical,Action,Fantasy,Thriller",
      tags: "alternate,historical,coldwar,paxwest2017,turn-based",
      youtube: "1W6vC3Z6DfI",
      img_screenshots: "a5orrdieqhwtijmvztyx,gx6pjkgyfeyunqryyhon,lrydepllxfvjwfnmcspw",
      released_at: "1976-04-19T12:59-0500",
      summary: "Starring one of the world’s most iconic Super Heroes, Marvel’s Spider-Man features the acrobatic abilities, improvisation and web-slinging that the wall-crawler is famous for, while also introducing elements never-before-seen in a Spider-Man game. Mix and match a varied set of evolved combat mechanics, including melee, aerial combat, webs, stealth, and unique high-tech gadgets that highlight Spider-Man’s boundless acrobatic agility and active combat style. Sony Interactive Entertainment, Insomniac Games, and Marvel have teamed up to create a brand-new and authentic Spider-Man adventure.",
      similar_games: [],
      dlc_games: []
    },
    {
      id: 6,
      slug: "adventure-time-pirates-of-the-enchiridion",
      title: "Adventure Time: Pirates Of The Enchiridion",
      img_cover: "obqa2nxm0gocmm0qwec5",
      releaseDate: "17th Jul, 2018",
      developer: "Climax Studios",
      platforms: "Nintendo Switch,Xbox One,Steam,PlayStation 4",
      categories: "Adventure,RPG,Action,Open World",
      tags: "fantasy",
      youtube: "GtUAC37OdSo",
      img_screenshots: "x9sspbdmp8tuiwtsgeou,ljz3hwmj8vcxsaa2hekj,bdzom7ytf1ssjj9hj1ne",
      released_at: "1976-04-19T12:59-0500",
      summary: "Starring one of the world’s most iconic Super Heroes, Marvel’s Spider-Man features the acrobatic abilities, improvisation and web-slinging that the wall-crawler is famous for, while also introducing elements never-before-seen in a Spider-Man game. Mix and match a varied set of evolved combat mechanics, including melee, aerial combat, webs, stealth, and unique high-tech gadgets that highlight Spider-Man’s boundless acrobatic agility and active combat style. Sony Interactive Entertainment, Insomniac Games, and Marvel have teamed up to create a brand-new and authentic Spider-Man adventure.",
      similar_games: [],
      dlc_games: []
    },
    {
      id: 7,
      slug: "football-manager-2019",
      title: "Football Manager 2019",
      img_cover: "co1h6j",
      releaseDate: "2nd Nov, 2018",
      developer: "Sports Interactive",
      platforms: "Steam",
      categories: "Simulator,Sport",
      tags: "football,management,simulator",
      youtube: "66-BT930evI",
      img_screenshots: "sc5j13,sc5j12,sc5j11",
      released_at: "1976-04-19T12:59-0500",
      summary: "Starring one of the world’s most iconic Super Heroes, Marvel’s Spider-Man features the acrobatic abilities, improvisation and web-slinging that the wall-crawler is famous for, while also introducing elements never-before-seen in a Spider-Man game. Mix and match a varied set of evolved combat mechanics, including melee, aerial combat, webs, stealth, and unique high-tech gadgets that highlight Spider-Man’s boundless acrobatic agility and active combat style. Sony Interactive Entertainment, Insomniac Games, and Marvel have teamed up to create a brand-new and authentic Spider-Man adventure.",
      similar_games: [],
      dlc_games: []
    },
    {
      id: 8,
      slug: "red-dead-redemption-2",
      title: "Red Dead Redemption 2",
      img_cover: "yfk9f2lbo0r7slytuhra",
      releaseDate: "26th Oct, 2018",
      developer: "Rockstar Studios",
      platforms: "PlayStation 4,Xbox One",
      categories: "RPG,Adventure,Shooter,Action,Open world",
      tags: "action-adventure,cowboy,horse,western",
      youtube: "94B-38sX5fs",
      img_screenshots: "mptosgjarjlyqxy7lqsm,dorsz0jbcecmkxvzi3t8,banftd8fgfytbsfx6mjz",
      released_at: "1976-04-19T12:59-0500",
      summary: "Starring one of the world’s most iconic Super Heroes, Marvel’s Spider-Man features the acrobatic abilities, improvisation and web-slinging that the wall-crawler is famous for, while also introducing elements never-before-seen in a Spider-Man game. Mix and match a varied set of evolved combat mechanics, including melee, aerial combat, webs, stealth, and unique high-tech gadgets that highlight Spider-Man’s boundless acrobatic agility and active combat style. Sony Interactive Entertainment, Insomniac Games, and Marvel have teamed up to create a brand-new and authentic Spider-Man adventure.",
      similar_games: [],
      dlc_games: []
    },
    {
      id: 9,
      slug: "phantom-doctrine--1",
      title: "Phantom Doctrine",
      img_cover: "oaov1veblnyapulbcfdb",
      releaseDate: "14th Aug, 2018",
      developer: "CreativeForge Games",
      platforms: "PlayStation 4,Xbox One,Steam",
      categories: "RPG,Strategy,Tactical,Action,Fantasy,Thriller",
      tags: "alternate,historical,coldwar,paxwest2017,turn-based",
      youtube: "1W6vC3Z6DfI",
      img_screenshots: "a5orrdieqhwtijmvztyx,gx6pjkgyfeyunqryyhon,lrydepllxfvjwfnmcspw",
      released_at: "1976-04-19T12:59-0500",
      summary: "Starring one of the world’s most iconic Super Heroes, Marvel’s Spider-Man features the acrobatic abilities, improvisation and web-slinging that the wall-crawler is famous for, while also introducing elements never-before-seen in a Spider-Man game. Mix and match a varied set of evolved combat mechanics, including melee, aerial combat, webs, stealth, and unique high-tech gadgets that highlight Spider-Man’s boundless acrobatic agility and active combat style. Sony Interactive Entertainment, Insomniac Games, and Marvel have teamed up to create a brand-new and authentic Spider-Man adventure.",
      similar_games: [],
      dlc_games: []
    },
    {
      id: 10,
      slug: "adventure-time-pirates-of-the-enchiridion",
      title: "Adventure Time: Pirates Of The Enchiridion",
      img_cover: "obqa2nxm0gocmm0qwec5",
      releaseDate: "17th Jul, 2018",
      developer: "Climax Studios",
      platforms: "Nintendo Switch,Xbox One,Steam,PlayStation 4",
      categories: "Adventure,RPG,Action,Open World",
      tags: "fantasy",
      youtube: "GtUAC37OdSo",
      img_screenshots: "x9sspbdmp8tuiwtsgeou,ljz3hwmj8vcxsaa2hekj,bdzom7ytf1ssjj9hj1ne",
      released_at: "1976-04-19T12:59-0500",
      summary: "Starring one of the world’s most iconic Super Heroes, Marvel’s Spider-Man features the acrobatic abilities, improvisation and web-slinging that the wall-crawler is famous for, while also introducing elements never-before-seen in a Spider-Man game. Mix and match a varied set of evolved combat mechanics, including melee, aerial combat, webs, stealth, and unique high-tech gadgets that highlight Spider-Man’s boundless acrobatic agility and active combat style. Sony Interactive Entertainment, Insomniac Games, and Marvel have teamed up to create a brand-new and authentic Spider-Man adventure.",
      similar_games: [],
      dlc_games: []
    },
    {
      id: 11,
      slug: "football-manager-2019",
      title: "Football Manager 2019",
      img_cover: "co1h6j",
      releaseDate: "2nd Nov, 2018",
      developer: "Sports Interactive",
      platforms: "Steam",
      categories: "Simulator,Sport",
      tags: "football,management,simulator",
      youtube: "66-BT930evI",
      img_screenshots: "sc5j13,sc5j12,sc5j11",
      released_at: "1976-04-19T12:59-0500",
      summary: "Starring one of the world’s most iconic Super Heroes, Marvel’s Spider-Man features the acrobatic abilities, improvisation and web-slinging that the wall-crawler is famous for, while also introducing elements never-before-seen in a Spider-Man game. Mix and match a varied set of evolved combat mechanics, including melee, aerial combat, webs, stealth, and unique high-tech gadgets that highlight Spider-Man’s boundless acrobatic agility and active combat style. Sony Interactive Entertainment, Insomniac Games, and Marvel have teamed up to create a brand-new and authentic Spider-Man adventure.",
      similar_games: [],
      dlc_games: []
    },
    {
      id: 12,
      slug: "red-dead-redemption-2",
      title: "Red Dead Redemption 2",
      img_cover: "yfk9f2lbo0r7slytuhra",
      releaseDate: "26th Oct, 2018",
      developer: "Rockstar Studios",
      platforms: "PlayStation 4,Xbox One",
      categories: "RPG,Adventure,Shooter,Action,Open world",
      tags: "action-adventure,cowboy,horse,western",
      youtube: "94B-38sX5fs",
      img_screenshots: "mptosgjarjlyqxy7lqsm,dorsz0jbcecmkxvzi3t8,banftd8fgfytbsfx6mjz",
      released_at: "1976-04-19T12:59-0500",
      summary: "Starring one of the world’s most iconic Super Heroes, Marvel’s Spider-Man features the acrobatic abilities, improvisation and web-slinging that the wall-crawler is famous for, while also introducing elements never-before-seen in a Spider-Man game. Mix and match a varied set of evolved combat mechanics, including melee, aerial combat, webs, stealth, and unique high-tech gadgets that highlight Spider-Man’s boundless acrobatic agility and active combat style. Sony Interactive Entertainment, Insomniac Games, and Marvel have teamed up to create a brand-new and authentic Spider-Man adventure.",
      similar_games: [],
      dlc_games: []
    },
  ],

  all: function() { 
    return this.games 
  },

  get: function(id) {
    const isGame = p => p.id === id
    return this.games.find(isGame)
  }
}

//export const API_HOST = "https://api.playgroundz.net/api"; // real
export const API_HOST = ""; // test

export function GameCoverImg({ gameData }) {
  var cover = 'https://images.igdb.com/igdb/image/upload/t_cover_big/';
  if(gameData.img_cover === '')
    cover = 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png';
  else
    cover = cover + gameData.img_cover + '.jpg';

  return (
    <img src={cover} alt={gameData.title} />
  )
}

export function GameBannerImg({ gameData }) {
  var banner = 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/';
  if(!gameData.img_cover || gameData.img_cover === '')
    banner = 'https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png';
  else
    banner = banner + gameData.img_screenshots.split(",")[0] + '.jpg';

  return (
    <img src={banner} alt={gameData.title} />
  )
}

export const categories = {
  1: 'Action',
  2: 'Adventure',
  3: 'Sports',
  4: 'Racing',
  5: 'RPG',
  6: 'Strategy',
  7: 'Platform',
  8: 'Music',
  9: 'Puzzle',
  10: 'Collectible Card Game',
  11: 'Arcade',
  12: 'Survival',
  13: 'Horror',
  14: 'Shooter',
  15: 'Party',
  16: 'Casual',
  17: 'Fighting',
  18: 'Simulation',
  19: 'Casino',
  20: 'Interactive Stories',
  21: 'Stealth',
  22: 'Family',
  23: 'Creative',
  24: 'Table/Board',
  25: 'Free to Play',
  26: 'Mature',
  27: 'Educational',
  28: 'SciFi',
  29: 'Fantasy',
  30: 'Thriller',
  31: 'Comedy',
  32: 'Drama',
  33: 'Romance',
  34: 'Relaxing',
  35: 'Gore',
  36: 'Crime',
  37: 'Open World',
  38: 'Indie',
  39: 'Online',
  40: 'Psychological',
  41: 'Mystery',
  42: 'Bundles',
  43: 'Non-fiction',
  44: 'Kids',
  45: 'Point-and-click',
  46: 'Hack and slash/Beat \'em up',
  47: 'Historical',
  48: 'Sandbox',
  49: 'Warfare',
  50: 'Erotic',
  51: 'Pinball',
  52: 'Tactical',
  53: 'Real Time',
  54: 'Business',
}

export const getCategoryName = (category) => {
  return categories[category];
}

export const platforms = {
  1: 'PC',
  2: 'PlayStation 2',
  3: 'PlayStation 3',
  4: 'PlayStation 4',
  5: 'PlayStation Vita',
  6: 'PlayStation Portable',
  7: 'PlayStation Network',
  8: 'Xbox 360',
  9: 'Xbox One',
  10: 'Xbox Live Arcade',
  11: 'Nintendo 3DS',
  12: 'Nintendo Switch',
  13: 'Nintendo GameCube',
  14: 'Wii',
  15: 'Wii U',
  16: 'Android',
  17: 'iOS',
  18: 'Windows Phone',
  19: 'BlackBerry OS',
  20: 'SteamOS',
  21: 'Linux',
  22: 'Mac',
  23: 'Ouya',
  24: 'Game Boy Advance',
  25: 'Xbox',
  26: 'Nintendo DS',
  27: 'Arcade',
  28: 'Web browser',
  29: 'Neo Geo AES',
  30: 'Neo Geo MVS',
  31: 'Playstation',
  32: 'Super Nintendo Entertainment System (SNES)',
  33: 'Atari ST/STE',
  34: 'PC DOS',
  35: 'Amiga',
  36: 'Apple II',
  37: 'Commodore C64/128',
  38: 'ZX Spectrum',
  39: 'Amstrad CPC',
  40: 'Virtual Console Nintendo)',
  41: 'Nintendo Entertainment System NES)',
  42: 'Sega Master System',
  43: 'Neo Geo CD',
  44: 'Oculus VR',
  45: 'SteamVR',
  46: 'PlayStation VR',
  47: 'Sega Mega Drive/Genesis',
  48: 'Dreamcast',
  49: 'Windows Mixed Reality',
  50: 'Sega Game Gear',
  51: 'SG-1000',
  52: 'Sega Saturn',
  53: '3DO Interactive Multiplayer',
  54: 'Mobile',
  55: 'Amazon Fire TV',
  56: 'MSX',
  57: 'Atari Lynx',
  58: 'Game Boy Color',
  59: 'Super Famicom',
  60: 'WiiWare',
  61: 'Apple IIGS',
  62: 'Mobile',
  63: 'PlayStation',
  64: 'Sega CD',
  65: 'Sharp X1',
  66: 'WiiWare',
  67: 'New Nintendo 3DS',
  68: 'Neo Geo Pocket Color',
  69: 'Nintendo 64',
}

export const getPlatformName = (platform) => {
  return platforms[platform];
}

export const getCategoriesName = (categories) => {
  var categoriesName = '';
  categories.map((category, i) => {
    if (categories.length-1 === i)
      categoriesName = categoriesName + getCategoryName(category);
    else
      categoriesName = categoriesName + `${getCategoryName(category)}, `;
  })
  return categoriesName;
}

export const getPlatformsName = (platforms) => {
  var platformsName = '';
  platforms.map((platform, i) => {
    if (platforms.length-1 === i)
      platformsName = platformsName + getPlatformName(platform);
    else
      platformsName = platformsName + `${getPlatformName(platform)}, `;
  })
  return platformsName;
}

export const renderWebsite = (websites, kind) => {
  let webArray = [];
  let webElement;
  String(websites).split(',').forEach(function(website) {
    webElement = website.split('|');
    if(webElement.length === 2) {
      webArray.push({
        id: parseInt(webElement[0]), value: webElement[1]
      });
    }
  });

  let retWeb = webArray.find(x => x.id === kind);
  return (retWeb? retWeb.value: null);
}

export const getAuthUserInfo = () => {
    if(API_HOST === '') return JSON.parse(localStorage.getItem("userInfo"));

    var cookies = new Cookies();
    return cookies.get("userInfo");
}

export const setAuthUserInfo = (userInfo) => {
    if(getAuthUserInfo()) return;

    var objUserInfo = {
      id: userInfo.id,
      username: userInfo.username,
      first_name: userInfo.first_name,
      avatar: userInfo.avatar,
      token: userInfo.token
    };

    if(API_HOST === '') {
        localStorage.setItem(
            "userInfo", JSON.stringify(objUserInfo)
        );
        return;
    }

    var cookies = new Cookies();
    cookies.set(
        "userInfo", objUserInfo,
        { path: '/', domain: '.playgroundz.net' }
    );
}

export const removeAuthUserInfo = () => {
    if(!getAuthUserInfo()) return;

    if(API_HOST === '') {
        localStorage.removeItem("userInfo");
        return;
    }

    var cookies = new Cookies();
    cookies.remove("userInfo", { path: '/', domain: '.playgroundz.net' });
}


var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

export const abbreviateNumber = (number) => {
    var tier = Math.log10(number) / 3 | 0;

    if(tier == 0) 
    return number;

    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);
    var scaled = number / scale;
    
    return scaled.toFixed(1) + suffix;
}

export default GameAPI;
