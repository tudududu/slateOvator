# 16.3.1 - 2026-07-23

Added:
- version reset checkbox added to duplicate names guard in compNameFromSlate()

# 16.3.0 - 2026-02-09

Added:
- version reset checkbox added to compNameFromSlate() - switch_version_reset

16b02 date and version checkboxes in compNameFromSlate group
16b01 slateOvator1(compNameFromSlate, checkbox_Date.value, checkbox_Version.value);
16a12 compNamesMultiSlate() alert: number of comps added
(slate is linked to another comp OR more slates linked to one comp)
check if slate is linked to the parent comp
one slate in more comps - 16a08
!single slate in comp - 16a08
16a11 compNameFromSlate() - osetreno, aby se proces nezastavil, pokud je v selection i něco jineho nez kompozice
problem byl v rozdilne delce poli pokud byl filtr az na urovni smycky
compNameFromSlate() filtruje na zacatku vyber jen na kompozice
16a10 slateOvator1() - opraveno - nefungoval pokud vyber nezahrnoval pouze kompozice
16a09 slateOvator2() - pullEssentialProperty - experimental - future
slateOvator1() - prerusi se pokud je slate pouzity vicekrat
16a08 slateOvator2() - prerusi se pokud jsou 2 slaty v kompozici
tj. ze v kazde kompozici je prave 1 slate vubec neprovede slateOvator1() a slateOvator2()
16a07 alert pred funkci, tak ze se pri nedodrzeni pominky "if (slateArr.length == 1) {}"
"too many or no slates." alert je nevhodne umisteny tak, ze zmena se provede ve zbytku vyberu
16a06 compNameFromSlate() presunut do slateOvator1(), pridana kontrola duplikovanych nazvu
16a05 slateSearchAdvanced() - oprava chyby, kdyz je slate jen jeden. Podminka pro vstup do porovnani byla zalozena na spatne promenne (musi byt zalozena na vysledku vyhledavani nejnovejsiho slatu)
ted opravim primo v slateSearchAdvanced(), ale pozdeji se k tomu vratim
v pripade, ze slate je jen jeden projevi se chyba - opakuje se theNewest() a do vstupniho pole se prida undefined a zastavi se sortReverseOrder()
16a04 nastaveny podminky v slateSearchAdvanced() - pokud neni nalezen slate v projektu nebo mimo nebo vubec, proces se nezastavi
- nefunguje vyhledavani slatu (napr. pokud je v importu)
- pri absenci slatu skonci uprostred, bez vysvestleni - hlaska
- dalsi problem 1169 - popsat
16a03 nouzova oprava - popsat
NEFUNGUJE spravne - najde nejnovejsi, ale pojmenuje ho jmenem starsi verze
prednost ma slate z vlastniho projektu, v pripade ze je i tam
16a02 slateSearch_v02 - hleda nejnovejsi verzi slatu v celem AE projektu
16a01 slateSearchAdvanced()
16a00 slateSearchAdvanced() misto slateSearchGlobal()
15g01 slateSearchGlobal() misto slateSearchAdvanced()
15f22 Navrat k 15f16, UI: compNameFSBtn barevna kontrolka vypnuta
15f14-15f21 UI: pokusy s pridanim barevne kontrolky pro 'compNameFSBtn', idealni cil je mit kontrolku na strane tlacitka, coz koliduje s align fill - tlacitko se neroztahuje nasiru panelu
15f21 UI: compNameFSBtn barevna kontrolka nad
15f20 UI: compNameFSBtn fixed preferredSize
15f19 UI: compNameFSBtn s barevnou kontrolkou, neroztahuje se na celou sirku panelu
15f18 UI: btns panel05.preferredSize
15f17 UI: barevna kontrolka vpravo u 'Comp name from slate', tlacitko se neroztahuje na celou sirku panelu, pouze do velikosti textu, zrusen align fill, pridano spacing mezi radiobuttony, zrusen panel03, integrace do panel05, zrusen label u panel05, uprava textu radiobuttonu, zrusen panel04 a integrace do panel05, zrusen label u panel04
15f16 UI: kompaktnejsi design - zrusen panel04, barevna kontrolka vpravo u 'Comp name from slate'
15f15 UI: barevna kontrolka vpravo u 'Comp name from slate', (comp|comps)
15f14 UI: barevna kontrolka vlevo u 'Comp name from slate' pouze pri hoveru nad tlacitkem
15f12 vlozen layerInspectToComp() do insertSlateEngine()
jeste stale bez layerInspection()
opraveno v insertSlateEngine()
15f11 insert slate kontrolouje pouze 1. vrstvu jestli neni slate uz v kompozici
15f10 win.slateInsertBtn -> var slateInsertBtn
15f09 vsechny 3 funkce svedeny do spolecneho "Slate insert" btn, zrusen prebalovator
15f01-08 slate lze vlozit primo do kompozice zaroven s posunutim vrstev (slateShift)
15f08 insertSlateEngine() - osetreno, aby se slate vkladalo pouze jednou, i kdyz je v kompozici více vrstev se slatem (prejmenovanych)
15f07 insertSlateEngine()
15f06 UI: radiobutton pro complete vs simple insert - pouze vlozeni slatu bez prodlouzeni a posunu, pripadne s prodlouzenim a posunem
15f05 insertSlateEngine() - hledani slatu v kompozici a podle toho se rozhodne, jestli se bude prodlužovat a posouvat, nebo jen posouvat zacatek
15f04 compLengthAdjust() - posun vrstev a prodlouzeni kompozice pouze pokud neni slate, jinak se posune pouze zacatek kompozice
15f03 compLengthAdjust()
15f02 aplikaceDoComp() misto insertSlateEngine()
15f01 uplne prekopani - zjednoduseni zaverecne casti nove kopie slatu
15e13 241107 simple output slate insertion
15e12 240914 nameNewSlate() reseni 3 (jistota)
15e11 240914 nameNewSlate() vyreseno hledani posledni kopie slatu (99, 100, 101) 3 reseni
POZOR layerInspection() je stale pouzit v logoTlacitkovatOr(), compNameFromSlate()
misto AVLayer davame rovnou CompItem findSlateComp() tim padem vyrazena
layerInspectToComp() misto layerInspection():
15e10 layerInspectToComp() zjednoduseni v pripade slatu
oprava layerInspection() nenasel state pokud byl prejmenovany uvnitr comp
opraveno provizorne tak ze nula se pridava jen k jednocifernym cislum
se radi a tim padem je jako posledni vyhodnocen znovu c. 09
15e9 nameNewSlate() - oprava nad 10. Od cisla slatu 10 pojmenovan 010, spatne
15e8 output comps 'justify fill' uspech (viz Variable fonts panel)
v15e7 UI: output comps pokus o 'justify fill'
v15e6 UI: compFolderLevel field (inputFolderLevel): vraceno
v15e5 ucesani automatizace compFolderLevel
odstraneno, automatizovano - hleda "comps", pokud comps !== 1 out bude v root
v15e4 UI: compFolderLevel field: bud odstranit nebo closable, (fce folderStructure)
v15e3 UI: compFolderLevel field: (ne)funkcnost (fce folderStructure) - opraveno
v15e3 UI: tab through edittext fields - Preskupeni: misto skupin pole s tlacitkem je skupina poli a skup. tlacitek.
v15e2 uprava folderStructure()
v15e1 uprava compNameFromSlate()
v15e pridano compNameFromSlate()
v15d4 nwItmSplt rozsiren split(/_| |-/g);
v15d3 osetreno cislovani novych slatu - token search - nameNewSlate()
v15d2 hledani nejnovejsiho i v 'master' slozce
v15d v kompozici hleda podle nazvu zdroje a ne vrstvy (layer.source.name instead of layer.name)
v15d layer name vs. layer source name - placeTheSlate(), slateSearchAdvanced()
v15c slateSarchAdvanced(regex) (updated function placeTheSlate)
v15 uprava copy() pro kopiruji masterComp vcetne parametru
v14c deleteLayers() odemknuti zamcenych vrstev, aby se odstranily, pokud jsou zamčené
v14 totez pro slate: id misto jmena
v13 prepina se pouze logo bg pouzite ve slatu - id
v12 vypinace tagy
v11 uprava prepisovace poli pro slate i comp
v09 insert compName via callback
v08 zacleneni part3 do part4
v07 slateOvator_part04a duplikat kompozice s apendixem do podslozky v parentFoldru
v07 wip fixing broken expressions due to the change of the name (fail)
v05 SlateOvator_part_02: compNamesMultiFnc
v03 slateOvator_part3 v08h limited to CompItem
v02 slateOvator_part3 v08h Insert slate into composition aplikaceDoComp(), fitToCompSize()
v01 240103 joining parts 1, 2, 3

to do:
vXX z callback fci oddelat instanceof pokud nejsou potreba
vXX focus target
vXX vicekrat pouzity slateSarch vyhodit do fce