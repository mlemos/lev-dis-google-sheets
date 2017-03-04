//
// Levenshtein Distance Function for Google Sheets
// 
// This function calculates de Levenshtein Distance (or Edit Distance) between two strings.
// I used the algorith and code from Wikipedia (https://en.wikipedia.org/wiki/Levenshtein_distance)
// as a reference and just adjusted the code to be used on Google Sheets.
//
// By: Manoel Lemos / manoel@lemos.net / http://manoellemos.com
//
// IMPORTANT: I added some code in the begining of the function to try to solve the issues
// related to rate-limit of App Scripts in Google Sheets. There is a limit of how many times
// per second you can call external funcions on Google Sheets. The code is a bit dumb and makes
// everything much slower, but it worked for me. You can comment it if you don't need too many
// calls (you'll have much faster response times).
//

function LevDis(s,t) {
  // Workaround on Google Sheets rate-limit for external functions 
  var sleep = Math.floor((Math.random() * 3000) + 1);
  Utilities.sleep(3000+sleep);
  
  // The code
  if (s == t) return 0;
  if (s.length == 0) return t.length;
  if (t.length == 0) return s.length;
  
  var v0 = [];
  var v1 = [];
  var i;
  var j;
  var cost;
  
  for (i = 0; i < (t.length+1); i++) {
      v0[i] = i;
  }
  
  for(i = 0; i < s.length; i++)
  {
      v1[0] = i + 1;  
      for(j = 0; j < t.length; j++)
      {
        if (s[i] == t[j]) {
          cost = 0;
        } else {
          cost = 1;
        }
        v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
      }
      for(j = 0; j < (t.length+1); j++) {
          v0[j] = v1[j];
      }
  }
  return v1[t.length];  
}
