function findAnagrams(s, p) {
    const result = [];
    const pFreqMap = {};
    const windowFreqMap = {};
    
    // Create frequency map for string p
    for (let char of p) {
        pFreqMap[char] = (pFreqMap[char] || 0) + 1;
    }
    
    let left = 0;
    let right = 0;
    const pLength = p.length;
    const sLength = s.length;
    
    while (right < sLength) {
        const char = s[right];
        
        // Expand window
        windowFreqMap[char] = (windowFreqMap[char] || 0) + 1;
        right++;
        
        // Check if window size matches p's length
        if (right - left === pLength) {
            // Compare window frequency map with p's frequency map
            if (compareMaps(windowFreqMap, pFreqMap)) {
                result.push(left);
            }
            
            // Shrink window
            const leftChar = s[left];
            windowFreqMap[leftChar]--;
            if (windowFreqMap[leftChar] === 0) {
                delete windowFreqMap[leftChar];
            }
            left++;
        }
    }
    
    return result;
}

function compareMaps(map1, map2) {
    for (let key in map1) {
        if (map1[key] !== map2[key]) {
            return false;
        }
    }
    return true;
}

// Test cases
console.log(findAnagrams("cbaebabacd", "abc")); // Output: [0, 6]
console.log(findAnagrams("abab", "ab")); // Output: [0, 1, 2]
