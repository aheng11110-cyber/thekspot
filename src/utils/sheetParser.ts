import { LocationData } from '../data/mockCurationData';

export async function fetchGoogleSheetData(csvUrl: string): Promise<LocationData[] | null> {
  try {
    if (!csvUrl) return null;

    const response = await fetch(csvUrl);
    const csvText = await response.text();

    return parseCSVToLocationData(csvText);
  } catch (error) {
    console.error("Failed to fetch Google Sheet data:", error);
    return null;
  }
}

function parseCSVToLocationData(csvText: string): LocationData[] {
  // Simple CSV parser handling quotes
  const rows = [];
  let row = [];
  let inQuotes = false;
  let currentVal = '';

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    
    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < csvText.length && csvText[i + 1] === '"') {
          currentVal += '"';
          i++; // skip next quote
        } else {
          inQuotes = false;
        }
      } else {
        currentVal += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(currentVal.trim());
        currentVal = '';
      } else if (char === '\n' || char === '\r') {
        if (char === '\r' && i + 1 < csvText.length && csvText[i + 1] === '\n') {
          i++;
        }
        row.push(currentVal.trim());
        if (row.some(val => val !== '')) {
          rows.push(row);
        }
        row = [];
        currentVal = '';
      } else {
        currentVal += char;
      }
    }
  }
  // push last value and row
  if (currentVal !== '' || row.length > 0) {
    row.push(currentVal.trim());
    if (row.some(val => val !== '')) {
      rows.push(row);
    }
  }

  if (rows.length < 2) return []; // No data or just headers

  const headers = rows[0].map(h => h.toLowerCase());
  
  const data: LocationData[] = rows.slice(1).map((row, index) => {
    const item: any = { id: index.toString(), links: {}, tags: [], groupSizes: [] };
    
    headers.forEach((header, colIndex) => {
      const val = row[colIndex] || '';
      
      switch(header) {
        case 'id': item.id = val || index.toString(); break;
        case 'name': item.name = val; break;
        case 'city': item.city = val; break;
        case 'province': item.province = val; break;
        case 'type': item.type = val || 'cafe'; break;
        case 'description': item.description = val; break;
        case 'imageurl': item.imageUrl = val || '/images/default.jpg'; break;
        case 'instagram': 
          if(val) item.links.instagram = val; 
          break;
        case 'blog': 
          if(val) item.links.blog = val; 
          break;
        case 'tags': 
          item.tags = val.split(',').map((t: string) => t.trim()).filter((t: string) => t); 
          break;
        case 'groupsizes': 
          item.groupSizes = val.split(',').map((t: string) => t.trim()).filter((t: string) => t); 
          break;
      }
    });

    return item as LocationData;
  });

  return data;
}
