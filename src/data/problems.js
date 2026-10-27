export const PROBLEMS = [
  {
    id: 1,
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    acceptance: '53.6%',
    tags: ['Array', 'Hash Table'],
    description: `Given an array of integers <code>nums</code> and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.<br/><br/>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the <em>same</em> element twice.<br/><br/>You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    functionName: 'twoSum',
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const map = {};
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (map[diff] !== undefined) {
            return [map[diff], i];
        }
        map[nums[i]] = i;
    }
    return [];
};`,
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] }
    ],
    hiddenTestCases: [
      { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] },
      { input: [[0, 4, 3, 0], 0], expected: [0, 3] }
    ],
    editorial: {
      summary: 'Using a Hash Map gives optimal O(n) time complexity by storing complements while iterating through the array once.',
      complexity: 'Time: O(n) | Space: O(n)'
    },
    solutions: [
      {
        title: 'One-Pass Hash Map (Optimal)',
        time: 'O(n)',
        space: 'O(n)',
        code: `var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
};`
      }
    ]
  },
  {
    id: 2,
    slug: 'palindrome-number',
    title: 'Palindrome Number',
    difficulty: 'Easy',
    acceptance: '56.1%',
    tags: ['Math'],
    description: `Given an integer <code>x</code>, return <code>true</code> if <code>x</code> is a <em>palindrome</em>, and <code>false</code> otherwise.<br/><br/>An integer is a palindrome when it reads the same forward and backward. For example, <code>121</code> is a palindrome while <code>123</code> is not.`,
    examples: [
      {
        input: 'x = 121',
        output: 'true',
        explanation: '121 reads as 121 from left to right and from right to left.'
      },
      {
        input: 'x = -121',
        output: 'false',
        explanation: 'From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.'
      },
      {
        input: 'x = 10',
        output: 'false',
        explanation: 'Reads 01 from right to left. Therefore it is not a palindrome.'
      }
    ],
    constraints: [
      '-2^31 <= x <= 2^31 - 1'
    ],
    functionName: 'isPalindrome',
    starterCode: `/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0) return false;
    const s = x.toString();
    return s === s.split('').reverse().join('');
};`,
    testCases: [
      { input: [121], expected: true },
      { input: [-121], expected: false },
      { input: [10], expected: false }
    ],
    hiddenTestCases: [
      { input: [0], expected: true },
      { input: [12321], expected: true },
      { input: [123456], expected: false }
    ],
    editorial: {
      summary: 'Negative numbers are never palindromes due to the leading minus sign. You can reverse half the number mathematically or convert to a string and reverse it.',
      complexity: 'Time: O(log10(n)) | Space: O(1)'
    },
    solutions: [
      {
        title: 'Revert Half of Number (No String conversion)',
        time: 'O(log10(n))',
        space: 'O(1)',
        code: `var isPalindrome = function(x) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
    let reverted = 0;
    while (x > reverted) {
        reverted = reverted * 10 + (x % 10);
        x = Math.floor(x / 10);
    }
    return x === reverted || x === Math.floor(reverted / 10);
};`
      }
    ]
  },
  {
    id: 3,
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    acceptance: '40.8%',
    tags: ['String', 'Stack'],
    description: `Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.<br/><br/>An input string is valid if:
<ol>
  <li>Open brackets must be closed by the same type of brackets.</li>
  <li>Open brackets must be closed in the correct order.</li>
  <li>Every close bracket has a corresponding open bracket of the same type.</li>
</ol>`,
    examples: [
      { input: 's = "()"', output: 'true', explanation: 'The bracket is properly closed.' },
      { input: 's = "()[]{}"', output: 'true', explanation: 'All brackets are matched.' },
      { input: 's = "(]"', output: 'false', explanation: 'Mismatched closing bracket.' }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.'
    ],
    functionName: 'isValid',
    starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    for (let char of s) {
        if (char === '(' || char === '{' || char === '[') {
            stack.push(char);
        } else {
            if (stack.pop() !== map[char]) {
                return false;
            }
        }
    }
    return stack.length === 0;
};`,
    testCases: [
      { input: ['()'], expected: true },
      { input: ['()[]{}'], expected: true },
      { input: ['(]'], expected: false }
    ],
    hiddenTestCases: [
      { input: ['{[]}'], expected: true },
      { input: ['['], expected: false },
      { input: [']'], expected: false }
    ],
    editorial: {
      summary: 'Use a Last-In First-Out (LIFO) stack. Whenever an open bracket appears, push it. When a closing bracket appears, pop the top of the stack and check for a match.',
      complexity: 'Time: O(n) | Space: O(n)'
    },
    solutions: [
      {
        title: 'Stack with Hash Map',
        time: 'O(n)',
        space: 'O(n)',
        code: `var isValid = function(s) {
    const stack = [];
    const pairs = { '(': ')', '{': '}', '[': ']' };
    for (let char of s) {
        if (pairs[char]) {
            stack.push(pairs[char]);
        } else if (stack.pop() !== char) {
            return false;
        }
    }
    return stack.length === 0;
};`
      }
    ]
  },
  {
    id: 4,
    slug: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    acceptance: '34.9%',
    tags: ['Hash Table', 'String', 'Sliding Window'],
    description: `Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with length 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with length 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with length 3.' }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    functionName: 'lengthOfLongestSubstring',
    starterCode: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let max = 0;
    let start = 0;
    const seen = new Map();
    for (let i = 0; i < s.length; i++) {
        if (seen.has(s[i]) && seen.get(s[i]) >= start) {
            start = seen.get(s[i]) + 1;
        }
        seen.set(s[i], i);
        max = Math.max(max, i - start + 1);
    }
    return max;
};`,
    testCases: [
      { input: ['abcabcbb'], expected: 3 },
      { input: ['bbbbb'], expected: 1 },
      { input: ['pwwkew'], expected: 3 }
    ],
    hiddenTestCases: [
      { input: [''], expected: 0 },
      { input: [' '], expected: 1 },
      { input: ['au'], expected: 2 },
      { input: ['dvdf'], expected: 3 }
    ],
    editorial: {
      summary: 'Maintain a sliding window with left and right pointers and store the last seen position of each character.',
      complexity: 'Time: O(n) | Space: O(min(m, n))'
    },
    solutions: [
      {
        title: 'Sliding Window with Map',
        time: 'O(n)',
        space: 'O(min(m, n))',
        code: `var lengthOfLongestSubstring = function(s) {
    const map = new Map();
    let left = 0, maxLen = 0;
    for (let right = 0; right < s.length; right++) {
        if (map.has(s[right])) {
            left = Math.max(left, map.get(s[right]) + 1);
        }
        map.set(s[right], right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};`
      }
    ]
  },
  {
    id: 5,
    slug: 'roman-to-integer',
    title: 'Roman to Integer',
    difficulty: 'Easy',
    acceptance: '61.5%',
    tags: ['Hash Table', 'Math', 'String'],
    description: `Roman numerals are represented by seven different symbols: <code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>, <code>D</code> and <code>M</code>.<br/><br/>
Given a roman numeral, convert it to an integer.`,
    examples: [
      { input: 's = "III"', output: '3', explanation: 'III = 3.' },
      { input: 's = "LVIII"', output: '58', explanation: 'L = 50, V= 5, III = 3.' },
      { input: 's = "MCMXCIV"', output: '1994', explanation: 'M = 1000, CM = 900, XC = 90 and IV = 4.' }
    ],
    constraints: [
      '1 <= s.length <= 15',
      's contains only the characters (\'I\', \'V\', \'X\', \'L\', \'C\', \'D\', \'M\').',
      'It is guaranteed that s is a valid roman numeral in the range [1, 3999].'
    ],
    functionName: 'romanToInt',
    starterCode: `/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const values = {
        'I': 1, 'V': 5, 'X': 10, 'L': 50,
        'C': 100, 'D': 500, 'M': 1000
    };
    let total = 0;
    for (let i = 0; i < s.length; i++) {
        const current = values[s[i]];
        const next = values[s[i + 1]];
        if (next && current < next) {
            total -= current;
        } else {
            total += current;
        }
    }
    return total;
};`,
    testCases: [
      { input: ['III'], expected: 3 },
      { input: ['LVIII'], expected: 58 },
      { input: ['MCMXCIV'], expected: 1994 }
    ],
    hiddenTestCases: [
      { input: ['IV'], expected: 4 },
      { input: ['IX'], expected: 9 },
      { input: ['XL'], expected: 40 }
    ],
    editorial: {
      summary: 'If the current symbol is less than the next symbol, subtract its value. Otherwise, add it.',
      complexity: 'Time: O(n) | Space: O(1)'
    },
    solutions: [
      {
        title: 'Single Pass with Lookahead',
        time: 'O(n)',
        space: 'O(1)',
        code: `var romanToInt = function(s) {
    const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let result = 0;
    for (let i = 0; i < s.length; i++) {
        if (i < s.length - 1 && map[s[i]] < map[s[i + 1]]) {
            result -= map[s[i]];
        } else {
            result += map[s[i]];
        }
    }
    return result;
};`
      }
    ]
  },
  {
    id: 6,
    slug: 'best-time-to-buy-and-sell-stock',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    acceptance: '54.2%',
    tags: ['Array', 'Dynamic Programming'],
    description: `You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.<br/><br/>You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.<br/><br/>Return <em>the maximum profit you can achieve from this transaction</em>. If you cannot achieve any profit, return <code>0</code>.`,
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'In this case, no transactions are done and the max profit = 0.' }
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    functionName: 'maxProfit',
    starterCode: `/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let minPrice = Infinity;
    let maxProfit = 0;
    for (let price of prices) {
        if (price < minPrice) {
            minPrice = price;
        } else if (price - minPrice > maxProfit) {
            maxProfit = price - minPrice;
        }
    }
    return maxProfit;
};`,
    testCases: [
      { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { input: [[7, 6, 4, 3, 1]], expected: 0 }
    ],
    hiddenTestCases: [
      { input: [[2, 4, 1]], expected: 2 },
      { input: [[1, 2]], expected: 1 },
      { input: [[3, 3, 5, 0, 0, 3, 1, 4]], expected: 4 }
    ],
    editorial: {
      summary: 'Keep track of the minimum price seen so far, and calculate the maximum profit if sold on the current day.',
      complexity: 'Time: O(n) | Space: O(1)'
    },
    solutions: [
      {
        title: 'Single Pass Greedy',
        time: 'O(n)',
        space: 'O(1)',
        code: `var maxProfit = function(prices) {
    let min = Infinity, profit = 0;
    for (let p of prices) {
        min = Math.min(min, p);
        profit = Math.max(profit, p - min);
    }
    return profit;
};`
      }
    ]
  },
  {
    id: 7,
    slug: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    acceptance: '51.1%',
    tags: ['Array', 'Divide and Conquer', 'Dynamic Programming'],
    description: `Given an integer array <code>nums</code>, find the subarray with the largest sum, and return <em>its sum</em>.`,
    examples: [
      { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { input: 'nums = [1]', output: '1', explanation: 'The subarray [1] has the largest sum 1.' },
      { input: 'nums = [5,4,-1,7,8]', output: '23', explanation: 'The subarray [5,4,-1,7,8] has the largest sum 23.' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    functionName: 'maxSubArray',
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let currentSum = nums[0];
    let maxSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
};`,
    testCases: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[5, 4, -1, 7, 8]], expected: 23 }
    ],
    hiddenTestCases: [
      { input: [[-1]], expected: -1 },
      { input: [[-2, -1]], expected: -1 },
      { input: [[-1, 0, -2]], expected: 0 }
    ],
    editorial: {
      summary: "Kadane's Algorithm: At each index, decide whether to add the current element to the ongoing subarray sum or start a new subarray from the current element.",
      complexity: 'Time: O(n) | Space: O(1)'
    },
    solutions: [
      {
        title: "Kadane's Algorithm",
        time: 'O(n)',
        space: 'O(1)',
        code: `var maxSubArray = function(nums) {
    let cur = nums[0], max = nums[0];
    for (let i = 1; i < nums.length; i++) {
        cur = Math.max(nums[i], cur + nums[i]);
        max = Math.max(max, cur);
    }
    return max;
};`
      }
    ]
  },
  {
    id: 8,
    slug: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    acceptance: '53.1%',
    tags: ['Math', 'Dynamic Programming', 'Memoization'],
    description: `You are climbing a staircase. It takes <code>n</code> steps to reach the top.<br/><br/>Each time you can either climb <code>1</code> or <code>2</code> steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: 'n = 2', output: '2', explanation: 'There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps.' },
      { input: 'n = 3', output: '3', explanation: 'There are three ways: 1. 1+1+1, 2. 1+2, 3. 2+1.' }
    ],
    constraints: [
      '1 <= n <= 45'
    ],
    functionName: 'climbStairs',
    starterCode: `/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if (n <= 2) return n;
    let prev2 = 1, prev1 = 2;
    for (let i = 3; i <= n; i++) {
        const cur = prev1 + prev2;
        prev2 = prev1;
        prev1 = cur;
    }
    return prev1;
};`,
    testCases: [
      { input: [2], expected: 2 },
      { input: [3], expected: 3 },
      { input: [4], expected: 5 }
    ],
    hiddenTestCases: [
      { input: [1], expected: 1 },
      { input: [5], expected: 8 },
      { input: [10], expected: 89 }
    ],
    editorial: {
      summary: 'This is the Fibonacci sequence. The number of ways to reach step n is the sum of ways to reach step n-1 and step n-2.',
      complexity: 'Time: O(n) | Space: O(1)'
    },
    solutions: [
      {
        title: 'Iterative Fibonacci with O(1) Space',
        time: 'O(n)',
        space: 'O(1)',
        code: `var climbStairs = function(n) {
    let a = 1, b = 1;
    for (let i = 0; i < n - 1; i++) {
        [a, b] = [b, a + b];
    }
    return b;
};`
      }
    ]
  },
  {
    id: 9,
    slug: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Easy',
    acceptance: '58.3%',
    tags: ['Array', 'Binary Search'],
    description: `Given an array of integers <code>nums</code> which is sorted in ascending order, and an integer <code>target</code>, write a function to search <code>target</code> in <code>nums</code>. If <code>target</code> exists, then return its index. Otherwise, return <code>-1</code>.<br/><br/>You must write an algorithm with <code>O(log n)</code> runtime complexity.`,
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4.' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1.' }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.'
    ],
    functionName: 'search',
    starterCode: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) return mid;
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
};`,
    testCases: [
      { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
      { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 }
    ],
    hiddenTestCases: [
      { input: [[5], 5], expected: 0 },
      { input: [[5], -5], expected: -1 },
      { input: [[1, 3, 5, 7, 9], 1], expected: 0 },
      { input: [[1, 3, 5, 7, 9], 9], expected: 4 }
    ],
    editorial: {
      summary: 'Classic binary search using two pointers (left and right) and halving the search space in each iteration.',
      complexity: 'Time: O(log n) | Space: O(1)'
    },
    solutions: [
      {
        title: 'Iterative Two-Pointers',
        time: 'O(log n)',
        space: 'O(1)',
        code: `var search = function(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        const m = (l + r) >> 1;
        if (nums[m] === target) return m;
        if (nums[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
};`
      }
    ]
  },
  {
    id: 10,
    slug: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'Medium',
    acceptance: '55.3%',
    tags: ['Array', 'Two Pointers', 'Greedy'],
    description: `You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.<br/><br/>Find two lines that together with the x-axis form a container, such that the container contains the most water.<br/><br/>Return <em>the maximum amount of water a container can store</em>.`,
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'The vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.' },
      { input: 'height = [1,1]', output: '1', explanation: 'Max area is 1.' }
    ],
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4'
    ],
    functionName: 'maxArea',
    starterCode: `/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let max = 0;
    let left = 0, right = height.length - 1;
    while (left < right) {
        const h = Math.min(height[left], height[right]);
        const w = right - left;
        max = Math.max(max, h * w);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return max;
};`,
    testCases: [
      { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expected: 49 },
      { input: [[1, 1]], expected: 1 }
    ],
    hiddenTestCases: [
      { input: [[4, 3, 2, 1, 4]], expected: 16 },
      { input: [[1, 2, 1]], expected: 2 },
      { input: [[2, 3, 4, 5, 18, 17, 6]], expected: 17 }
    ],
    editorial: {
      summary: 'Two pointers starting at opposite ends. The area is limited by the shorter line, so always move the pointer pointing to the shorter line inward.',
      complexity: 'Time: O(n) | Space: O(1)'
    },
    solutions: [
      {
        title: 'Two Pointers Greedy',
        time: 'O(n)',
        space: 'O(1)',
        code: `var maxArea = function(height) {
    let l = 0, r = height.length - 1, ans = 0;
    while (l < r) {
        ans = Math.max(ans, Math.min(height[l], height[r]) * (r - l));
        height[l] < height[r] ? l++ : r--;
    }
    return ans;
};`
      }
    ]
  },
  {
    id: 11,
    slug: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    acceptance: '46.7%',
    tags: ['Two Pointers', 'String'],
    description: `A phrase is a <strong>palindrome</strong> if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.<br/><br/>Given a string <code>s</code>, return <code>true</code> <em>if it is a palindrome, or </em><code>false</code><em> otherwise</em>.`,
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' },
      { input: 's = " "', output: 'true', explanation: 's is an empty string "" after removing non-alphanumeric characters. An empty string is a palindrome.' }
    ],
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.'
    ],
    functionName: 'isPalindrome',
    starterCode: `/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    let left = 0, right = clean.length - 1;
    while (left < right) {
        if (clean[left] !== clean[right]) return false;
        left++;
        right--;
    }
    return true;
};`,
    testCases: [
      { input: ['A man, a plan, a canal: Panama'], expected: true },
      { input: ['race a car'], expected: false },
      { input: [' '], expected: true }
    ],
    hiddenTestCases: [
      { input: ['ab_a'], expected: true },
      { input: ['0P'], expected: false }
    ],
    editorial: {
      summary: 'Clean string with regex to keep alphanumeric characters and lowercase, then compare characters using two pointers from outer ends inward.',
      complexity: 'Time: O(n) | Space: O(n)'
    },
    solutions: [
      {
        title: 'Two Pointers with Regex',
        time: 'O(n)',
        space: 'O(1) extra',
        code: `var isPalindrome = function(s) {
    const str = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (let i = 0, j = str.length - 1; i < j; i++, j--) {
        if (str[i] !== str[j]) return false;
    }
    return true;
};`
      }
    ]
  },
  {
    id: 12,
    slug: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    acceptance: '47.5%',
    tags: ['Array', 'Sorting'],
    description: `Given an array of <code>intervals</code> where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, merge all overlapping intervals, and return <em>an array of the non-overlapping intervals that cover all the intervals in the input</em>.`,
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]', explanation: 'Intervals [1,4] and [4,5] are considered overlapping.' }
    ],
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i <= end_i <= 10^4'
    ],
    functionName: 'merge',
    starterCode: `/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    if (!intervals.length) return [];
    intervals.sort((a, b) => a[0] - b[0]);
    const merged = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        const prev = merged[merged.length - 1];
        const cur = intervals[i];
        if (cur[0] <= prev[1]) {
            prev[1] = Math.max(prev[1], cur[1]);
        } else {
            merged.push(cur);
        }
    }
    return merged;
};`,
    testCases: [
      { input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expected: [[1, 6], [8, 10], [15, 18]] },
      { input: [[[1, 4], [4, 5]]], expected: [[1, 5]] }
    ],
    hiddenTestCases: [
      { input: [[[1, 4], [0, 4]]], expected: [[0, 4]] },
      { input: [[[1, 4], [2, 3]]], expected: [[1, 4]] }
    ],
    editorial: {
      summary: 'Sort intervals by starting time. Then iterate and merge if the current interval starts before or at the end of the previous one.',
      complexity: 'Time: O(n log n) | Space: O(n)'
    },
    solutions: [
      {
        title: 'Sort and Merge In-Place / Accumulator',
        time: 'O(n log n)',
        space: 'O(n)',
        code: `var merge = function(intervals) {
    intervals.sort((a, b) => a[0] - b[0]);
    return intervals.reduce((acc, curr) => {
        if (!acc.length || acc[acc.length - 1][1] < curr[0]) {
            acc.push(curr);
        } else {
            acc[acc.length - 1][1] = Math.max(acc[acc.length - 1][1], curr[1]);
        }
        return acc;
    }, []);
};`
      }
    ]
  },
  {
    id: 13,
    slug: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'Medium',
    acceptance: '68.0%',
    tags: ['Array', 'Hash Table', 'String', 'Sorting'],
    description: `Given an array of strings <code>strs</code>, group the <strong>anagrams</strong> together. You can return the answer in <strong>any order</strong>.<br/><br/>An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explanation: 'Anagrams are grouped together.' },
      { input: 'strs = [""]', output: '[[""]]', explanation: 'Single empty string.' },
      { input: 'strs = ["a"]', output: '[["a"]]', explanation: 'Single character.' }
    ],
    constraints: [
      '1 <= strs.length <= 10^4',
      '0 <= strs[i].length <= 100',
      'strs[i] consists of lowercase English letters.'
    ],
    functionName: 'groupAnagrams',
    starterCode: `/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    const map = {};
    for (let str of strs) {
        const sorted = str.split('').sort().join('');
        if (!map[sorted]) map[sorted] = [];
        map[sorted].push(str);
    }
    return Object.values(map);
};`,
    testCases: [
      { input: [["eat", "tea", "tan", "ate", "nat", "bat"]], expected: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]] },
      { input: [[""]], expected: [[""]] },
      { input: [["a"]], expected: [["a"]] }
    ],
    hiddenTestCases: [
      { input: [["a", "b", "c"]], expected: [["a"], ["b"], ["c"]] }
    ],
    editorial: {
      summary: 'Sort each string alphabetically to form the hash map key. Group all strings sharing the identical sorted key.',
      complexity: 'Time: O(n * k log k) | Space: O(n * k)'
    },
    solutions: [
      {
        title: 'Categorize by Sorted String',
        time: 'O(n * k log k)',
        space: 'O(n * k)',
        code: `var groupAnagrams = function(strs) {
    const res = {};
    for (let s of strs) {
        const key = s.split('').sort().join('');
        if (!res[key]) res[key] = [];
        res[key].push(s);
    }
    return Object.values(res);
};`
      }
    ]
  },
  {
    id: 14,
    slug: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    acceptance: '65.8%',
    tags: ['Array', 'Prefix Sum'],
    description: `Given an integer array <code>nums</code>, return <em>an array</em> <code>answer</code> <em>such that</em> <code>answer[i]</code> <em>is equal to the product of all the elements of</em> <code>nums</code> <em>except</em> <code>nums[i]</code>.<br/><br/>The product of any prefix or suffix of <code>nums</code> is <strong>guaranteed</strong> to fit in a <strong>32-bit</strong> integer.<br/><br/>You must write an algorithm that runs in <code>O(n)</code> time and without using the division operation.`,
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[24,12,8,6]', explanation: 'Product of array except self.' },
      { input: 'nums = [-1,1,0,-3,3]', output: '[0,0,9,0,0]', explanation: 'Product with zero handling.' }
    ],
    constraints: [
      '2 <= nums.length <= 10^5',
      '-30 <= nums[i] <= 30',
      'The input is generated such that answer[i] fits in a 32-bit integer.'
    ],
    functionName: 'productExceptSelf',
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const n = nums.length;
    const res = new Array(n).fill(1);
    let left = 1;
    for (let i = 0; i < n; i++) {
        res[i] = left;
        left *= nums[i];
    }
    let right = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= right;
        right *= nums[i];
    }
    return res;
};`,
    testCases: [
      { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
      { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] }
    ],
    hiddenTestCases: [
      { input: [[2, 3]], expected: [3, 2] },
      { input: [[0, 0]], expected: [0, 0] }
    ],
    editorial: {
      summary: 'Compute prefix products in a forward pass, then multiply with suffix products in a backward pass.',
      complexity: 'Time: O(n) | Space: O(1) extra space'
    },
    solutions: [
      {
        title: 'Prefix and Suffix in O(1) extra space',
        time: 'O(n)',
        space: 'O(1) extra',
        code: `var productExceptSelf = function(nums) {
    const res = new Array(nums.length).fill(1);
    for (let i = 1; i < nums.length; i++) {
        res[i] = res[i - 1] * nums[i - 1];
    }
    let r = 1;
    for (let i = nums.length - 1; i >= 0; i--) {
        res[i] *= r;
        r *= nums[i];
    }
    return res;
};`
      }
    ]
  },
  {
    id: 15,
    slug: 'remove-duplicates-from-sorted-array',
    title: 'Remove Duplicates from Sorted Array',
    difficulty: 'Easy',
    acceptance: '56.9%',
    tags: ['Array', 'Two Pointers'],
    description: `Given an integer array <code>nums</code> sorted in <strong>non-decreasing order</strong>, remove the duplicates <strong>in-place</strong> such that each unique element appears only <strong>once</strong>. The relative order of the elements should be kept the same. Then return <em>the number of unique elements in </em><code>nums</code>.`,
    examples: [
      { input: 'nums = [1,1,2]', output: '2, nums = [1,2,_]', explanation: 'Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.' },
      { input: 'nums = [0,0,1,1,1,2,2,3,3,4]', output: '5, nums = [0,1,2,3,4,_,_,_,_,_]', explanation: 'Your function should return k = 5, with the first five elements being 0, 1, 2, 3, and 4.' }
    ],
    constraints: [
      '1 <= nums.length <= 3 * 10^4',
      '-100 <= nums[i] <= 100',
      'nums is sorted in non-decreasing order.'
    ],
    functionName: 'removeDuplicates',
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;
    let k = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            nums[k] = nums[i];
            k++;
        }
    }
    return k;
};`,
    testCases: [
      { input: [[1, 1, 2]], expected: 2 },
      { input: [[0, 0, 1, 1, 1, 2, 2, 3, 3, 4]], expected: 5 }
    ],
    hiddenTestCases: [
      { input: [[1]], expected: 1 },
      { input: [[1, 2, 3]], expected: 3 }
    ],
    editorial: {
      summary: 'Maintain a slow pointer `k` for placing the next unique element, and iterate with a fast pointer.',
      complexity: 'Time: O(n) | Space: O(1)'
    },
    solutions: [
      {
        title: 'Two Pointers In-Place',
        time: 'O(n)',
        space: 'O(1)',
        code: `var removeDuplicates = function(nums) {
    let k = 0;
    for (let i = 0; i < nums.length; i++) {
        if (i === 0 || nums[i] !== nums[i - 1]) {
            nums[k++] = nums[i];
        }
    }
    return k;
};`
      }
    ]
  },
  {
    id: 16,
    slug: '3sum',
    title: '3Sum',
    difficulty: 'Medium',
    acceptance: '34.7%',
    tags: ['Array', 'Two Pointers', 'Sorting'],
    description: `Given an integer array nums, return all the triplets <code>[nums[i], nums[j], nums[k]]</code> such that <code>i != j</code>, <code>i != k</code>, and <code>j != k</code>, and <code>nums[i] + nums[j] + nums[k] == 0</code>.<br/><br/>Notice that the solution set must not contain duplicate triplets.`,
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]', explanation: 'Triplets adding up to zero.' },
      { input: 'nums = [0,1,1]', output: '[]', explanation: 'No triplets sum to 0.' },
      { input: 'nums = [0,0,0]', output: '[[0,0,0]]', explanation: 'The only possible triplet sums to 0.' }
    ],
    constraints: [
      '3 <= nums.length <= 3000',
      '-10^5 <= nums[i] <= 10^5'
    ],
    functionName: 'threeSum',
    starterCode: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let left = i + 1, right = nums.length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
};`,
    testCases: [
      { input: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
      { input: [[0, 1, 1]], expected: [] },
      { input: [[0, 0, 0]], expected: [[0, 0, 0]] }
    ],
    hiddenTestCases: [
      { input: [[-2, 0, 1, 1, 2]], expected: [[-2, 0, 2], [-2, 1, 1]] }
    ],
    editorial: {
      summary: 'Sort the array first. Loop through `nums[i]` and use two pointers to find two elements that sum to `-nums[i]`, skipping duplicates.',
      complexity: 'Time: O(n²) | Space: O(1) or O(n) for sorting'
    },
    solutions: [
      {
        title: 'Sort + Two Pointers',
        time: 'O(n²)',
        space: 'O(n)',
        code: `var threeSum = function(nums) {
    nums.sort((a, b) => a - b);
    const res = [];
    for (let i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let l = i + 1, r = nums.length - 1;
        while (l < r) {
            const s = nums[i] + nums[l] + nums[r];
            if (s === 0) {
                res.push([nums[i], nums[l], nums[r]]);
                while (nums[l] === nums[l + 1]) l++;
                while (nums[r] === nums[r - 1]) r--;
                l++; r--;
            } else if (s < 0) l++;
            else r--;
        }
    }
    return res;
};`
      }
    ]
  },
  {
    id: 17,
    slug: 'reverse-string',
    title: 'Reverse String',
    difficulty: 'Easy',
    acceptance: '78.2%',
    tags: ['Two Pointers', 'String'],
    description: `Write a function that reverses a string. The input string is given as an array of characters <code>s</code>.<br/><br/>You must do this by modifying the input array <strong>in-place</strong> with <code>O(1)</code> extra memory.`,
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]', explanation: 'Reversed in-place.' },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]', explanation: 'Reversed in-place.' }
    ],
    constraints: [
      '1 <= s.length <= 10^5',
      's[i] is a printable ascii character.'
    ],
    functionName: 'reverseString',
    starterCode: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        const temp = s[left];
        s[left] = s[right];
        s[right] = temp;
        left++;
        right--;
    }
    return s;
};`,
    testCases: [
      { input: [["h", "e", "l", "l", "o"]], expected: ["o", "l", "l", "e", "h"] },
      { input: [["H", "a", "n", "n", "a", "h"]], expected: ["h", "a", "n", "n", "a", "H"] }
    ],
    hiddenTestCases: [
      { input: [["a"]], expected: ["a"] }
    ],
    editorial: {
      summary: 'Swap characters at the left and right pointers while moving them toward each other.',
      complexity: 'Time: O(n) | Space: O(1)'
    },
    solutions: [
      {
        title: 'Two Pointers Swap',
        time: 'O(n)',
        space: 'O(1)',
        code: `var reverseString = function(s) {
    let l = 0, r = s.length - 1;
    while (l < r) {
        [s[l], s[r]] = [s[r], s[l]];
        l++; r--;
    }
    return s;
};`
      }
    ]
  },
  {
    id: 18,
    slug: 'find-minimum-in-rotated-sorted-array',
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'Medium',
    acceptance: '50.4%',
    tags: ['Array', 'Binary Search'],
    description: `Suppose an array of length <code>n</code> sorted in ascending order is <strong>rotated</strong> between <code>1</code> and <code>n</code> times.<br/><br/>Given the sorted rotated array <code>nums</code> of <strong>unique</strong> elements, return <em>the minimum element of this array</em>.<br/><br/>You must write an algorithm that runs in <code>O(log n) time.</code>`,
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1', explanation: 'The original array was [1,2,3,4,5] rotated 3 times.' },
      { input: 'nums = [4,5,6,7,0,1,2]', output: '0', explanation: 'The minimum element is 0.' }
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 5000',
      '-5000 <= nums[i] <= 5000',
      'All the integers of nums are unique.'
    ],
    functionName: 'findMin',
    starterCode: `/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return nums[left];
};`,
    testCases: [
      { input: [[3, 4, 5, 1, 2]], expected: 1 },
      { input: [[4, 5, 6, 7, 0, 1, 2]], expected: 0 }
    ],
    hiddenTestCases: [
      { input: [[11, 13, 15, 17]], expected: 11 },
      { input: [[2, 1]], expected: 1 }
    ],
    editorial: {
      summary: 'Use binary search. If nums[mid] > nums[right], the inflection point must be to the right of mid; otherwise, it is at or to the left of mid.',
      complexity: 'Time: O(log n) | Space: O(1)'
    },
    solutions: [
      {
        title: 'Binary Search Inflection Point',
        time: 'O(log n)',
        space: 'O(1)',
        code: `var findMin = function(nums) {
    let l = 0, r = nums.length - 1;
    while (l < r) {
        const m = (l + r) >> 1;
        if (nums[m] > nums[r]) l = m + 1;
        else r = m;
    }
    return nums[l];
};`
      }
    ]
  },
  {
    id: 19,
    slug: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    acceptance: '61.7%',
    tags: ['Array', 'Hash Table', 'Sorting'],
    description: `Given an integer array <code>nums</code>, return <code>true</code> if any value appears <strong>at least twice</strong> in the array, and return <code>false</code> if every element is distinct.`,
    examples: [
      { input: 'nums = [1,2,3,1]', output: 'true', explanation: 'Element 1 occurs twice.' },
      { input: 'nums = [1,2,3,4]', output: 'false', explanation: 'All elements are distinct.' },
      { input: 'nums = [1,1,1,3,3,4,3,2,4,2]', output: 'true', explanation: 'Multiple duplicates found.' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    functionName: 'containsDuplicate',
    starterCode: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    const set = new Set();
    for (let num of nums) {
        if (set.has(num)) return true;
        set.add(num);
    }
    return false;
};`,
    testCases: [
      { input: [[1, 2, 3, 1]], expected: true },
      { input: [[1, 2, 3, 4]], expected: false },
      { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true }
    ],
    hiddenTestCases: [
      { input: [[0]], expected: false }
    ],
    editorial: {
      summary: 'Using a Set provides O(1) lookups. Check if the element already exists in the set as you traverse.',
      complexity: 'Time: O(n) | Space: O(n)'
    },
    solutions: [
      {
        title: 'Set Length Comparison',
        time: 'O(n)',
        space: 'O(n)',
        code: `var containsDuplicate = function(nums) {
    return new Set(nums).size !== nums.length;
};`
      }
    ]
  },
  {
    id: 20,
    slug: 'longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    difficulty: 'Medium',
    acceptance: '33.8%',
    tags: ['Two Pointers', 'String', 'Dynamic Programming'],
    description: `Given a string <code>s</code>, return <em>the longest palindromic substring</em> in <code>s</code>.`,
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' },
      { input: 's = "cbbd"', output: '"bb"', explanation: 'Longest palindrome is "bb".' }
    ],
    constraints: [
      '1 <= s.length <= 1000',
      's consist of only digits and English letters.'
    ],
    functionName: 'longestPalindrome',
    starterCode: `/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (!s || s.length < 1) return "";
    let start = 0, end = 0;
    
    function expandAroundCenter(left, right) {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }
    
    for (let i = 0; i < s.length; i++) {
        const len1 = expandAroundCenter(i, i);
        const len2 = expandAroundCenter(i, i + 1);
        const len = Math.max(len1, len2);
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }
    return s.substring(start, end + 1);
};`,
    testCases: [
      { input: ['babad'], expected: 'bab' },
      { input: ['cbbd'], expected: 'bb' }
    ],
    hiddenTestCases: [
      { input: ['a'], expected: 'a' },
      { input: ['ac'], expected: 'a' }
    ],
    editorial: {
      summary: 'Expand around center for each possible center (both odd-length centers `i` and even-length centers `i, i+1`).',
      complexity: 'Time: O(n²) | Space: O(1)'
    },
    solutions: [
      {
        title: 'Expand Around Center',
        time: 'O(n²)',
        space: 'O(1)',
        code: `var longestPalindrome = function(s) {
    let start = 0, maxLen = 0;
    const expand = (l, r) => {
        while (l >= 0 && r < s.length && s[l] === s[r]) {
            if (r - l + 1 > maxLen) {
                start = l;
                maxLen = r - l + 1;
            }
            l--; r++;
        }
    };
    for (let i = 0; i < s.length; i++) {
        expand(i, i);
        expand(i, i + 1);
    }
    return s.slice(start, start + maxLen);
};`
      }
    ]
  }
];
