langs=('saisiyat' 'kavalan' 'tsou' 'amis' 'sakizaya' 'seediq' 'bunun' 'atayal' 'rukai' 'kanakanavu' 'puyuma' 'bunun')
 
for lang in "${langs[@]}"
do
    wget -O "lang/${lang}".jpg "http://203.66.168.190/images/mainpic_${lang}.jpg"
done
