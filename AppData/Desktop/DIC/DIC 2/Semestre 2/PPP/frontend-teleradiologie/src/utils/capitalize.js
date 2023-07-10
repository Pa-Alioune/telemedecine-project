export default function capitalize(str) {
    const words = str.split('_');
  
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  
    const capitalizedStr = capitalizedWords.join(' ');
  
    return capitalizedStr;
  }