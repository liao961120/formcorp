// /src/helpers.js

// For Leipzig.vue
export class Highlight {
    static highlight(tk, query, isRegex, ignoreCharSet) {
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
                var norm_tk = normToken(tk, ignoreCharSet);
                var norm_q = normToken(query_arr[j], ignoreCharSet);
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
function normToken(x, ignoreCharSet) {
    for (var i = 0; i < ignoreCharSet.length; i++)
        x = x.replaceAll(ignoreCharSet[i], "")
    return x
}