export const truncateString = (str: string, maxLength: number) => {
    if (str.length > maxLength) {

      // If it is a string made up of more than one word, return only the first word
      if (str.includes(' ')) {   
        const words: string[] = str.split(' ');
        const word: string = words[0];
        return word;
      }
      
      return `${str.slice(0, maxLength)}   ...`;   // If it is a string that exceeds the character limit entered in the function parameter
    }

    return str;
  };