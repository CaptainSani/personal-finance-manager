const categories = {
    shopping: ['supermarket', 'grocery', 'store', 'foodstuffs'],
    utilities: ['electricity', 'water', 'gas', 'lundary'],
    entertainment: ['cinema', 'football', 'game', 'beach', 'club', 'tgif', 'date night'],
    transport: ['uber', 'bolt', 'in-drive', 'bus'],
    subscription: ['data', 'dstv', 'gotv', 'gym', 'netflix', 'primetv', 'amazontv', 'appletv'],
    blacktax: ['friends', 'families', 'gifts']
  };
  
  const autoCategorize = (narration) => {
    for (const category in categories) {
      if (categories[category].some((keyword) => narration.toLowerCase().includes(keyword))) {
        return category;
      }
    }
    return 'others', 'miscellaneous';
  };
  
  module.exports = { autoCategorize };
  