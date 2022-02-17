// /src/helpers.js

// For Leipzig.vue
export class Highlight {
    static highlight(tk, query, isRegex, ignoreCharSet, proxyCharSet) {
        var query_arr = query.split(/\s*&&\s*/).map(x => x.trim());

        // RegEx search
        if (isRegex) {
            for (var i = 0; i < query_arr.length; i++) {
                var regex = RegExp(`(${query_arr[i]})`, "g");
                if (regex.test(tk)) {
                    tk = tk.replace(regex, myReplace);
                    break
                }
            }

            // Exact search
        } else {
            for (var j = 0; j < query_arr.length; j++) {
                var norm_tk = normToken(tk, ignoreCharSet, proxyCharSet);
                var norm_q = normToken(query_arr[j], ignoreCharSet, proxyCharSet);
                if (tk.includes(query_arr[j])) {
                    tk = tk.replace(query_arr[j], myReplace2);
                    break
                } else if (norm_tk.includes(norm_q) & norm_q.length > 1) {
                    tk = myReplace3(tk);
                    break
                }
            }
        }

        return tk
    }
}
function myReplace(str, group1) {
    return "<span class='matchedtoken'>" + group1.replace('<', '&lt;').replace('>', '&gt;') + "</span>"
}
function myReplace2(str) {
    return "<span class='matchedtoken'>" + str.replace('<', '&lt;').replace('>', '&gt;') + "</span>"
}
function myReplace3(str) {
    return "<span class='matchedtoken fuzzy'>" + str.replace('<', '&lt;').replace('>', '&gt;') + "</span>"
}
function normToken(x, ignoreCharSet, proxyCharSet) {
    for (let i = 0; i < ignoreCharSet.length; i++)
        x = x.replaceAll(ignoreCharSet[i], "")
    for (let i = 0; i < proxyCharSet.length; i++)
        x = x.replaceAll(proxyCharSet[i][0], proxyCharSet[i][1]); 
    return x.toLowerCase()
}


// Date Normalize
export class DateUtil {
    static normalize(str) {
        if (str.match(/\d{4}-\d{1,2}-\d{1,2}/)) {
            str = str.split('-')
            return `${str[0]}-${str[1].padStart(2, '0')}-${str[2].padStart(2, '0')}`
        }
        return str
    }
}
