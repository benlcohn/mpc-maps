require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Sound = require('./models/sound');

(async function() {
    // await Category.deleteMany({});
    const categories = await Category.create([
      // {name: 'Boom', sortOrder: 10},
      // {name: 'Clap', sortOrder: 20},
      // {name: 'HiHat-Open', sortOrder: 30},
      // {name: 'HiHat-Closed', sortOrder: 40},
      // {name: 'Kick', sortOrder: 50},
      // {name: 'Ride', sortOrder: 60},
      // {name: 'Snare', sortOrder: 70},
      // {name: 'Tink', sortOrder: 80},
      // {name: 'Tom-High', sortOrder: 90},
      // {name: 'Tom-Low', sortOrder: 100},
      // {name: 'Tom-Mid', sortOrder: 110},
      // {name: '808', sortOrder: 120},
      // {name: 'Softpad', sortOrder: 130},
      // {name: 'FX', sortOrder: 140},
      // {name: 'Keys', sortOrder: 150},
      // {name: 'Horn', sortOrder: 160},
      // {name: 'Cymbals', sortOrder: 170},
      // {name: 'Percs', sortOrder: 180},
      // {name: 'Snaps', sortOrder: 190},
      // {name: 'Keys', sortOrder: 200},

    ]);

//     await Item.deleteMany({});
//   const items = await Item.create([
//     {title: 'Boom', url:  },
//     {title: 'Clap', url:  },
//     {title: 'HiHat-Open', url:  },
//     {title: 'HiHat-Closed', url:  },
//     {title: 'Kick', url:  },
//     {title: 'Ride', url:  },
//     {title: 'Snare', url:  },
//     {title: 'Tink', url:  },
//     {title: 'Tom-High', url:  },
//     {title: 'Tom-Low', url:  },
//     {title: 'Tom-Mid', url:  },
//   ]);

    process.exit();

})();