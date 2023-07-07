;оба индекса начинаются с 9, i % 2 == 0, j % 3 == 0, массив 11 на 9, 9 разрядные числа



ORG 0x637
WORD 1
WORD 2 ;... числа инлайном

ORG 0x0
I: WORD 0 ;итый инжекс
J: WORD 0 ;житый индекс
CurrEL: WORD 0x0 ;адрес текущего элемента
Mask: WORD 0x0001 ;маска для проверки четности
ClearMask: WORD 0x01FF ;для очистки первых бит от мусора
AddConst: WORD 0xFFFF ;для расширения знака старшей части
ExtSiYo: WORD 0x1E00 ;для расширения знака младшей части
CurrEl_St: WORD 0 ;старшая часть 
ResYo: WORD 0 ;младшая часть реза
ResOld: WORD 0 ;старшая часть реза
Addr: WORD 0x637 ;константа исходного адреса
START:

CLA
ST ResYo
ST ResOld
ST CurrEl_St
LD #9
ST I
ST J
LD Addr
ST CurrEL ;блок с реентерабельностью

IterI:
LD I
AND Mask ;проверяем I на четность, если нет, то пропуск массива
BZC SkipRow

IterJ: 
AND (CurrEL)+
LD J
CALL MOD3
BZC ContinueJ ;проверка J на кратность 3м, если нет, то идем дальше по элементам
LD (CurrEL)
AND ClearMask
ST (CurrEL) ;чистим первые биты от мусора
ASL
ASL
ASL
ASL
ASL
ASL
ASL
ROL ;сдвигаем, получаем знак числа в флаге С, если 1, то идем в расширение
BCS ExtSign

Count:
LD (CurrEL)
ADD ResYo
ST ResYo ;подсчет младшей части
LD CurrEl_St
ADC ResOld
ST ResOld ;подсчет старшей части с учетом переноса
LD #0
ST CurrEl_St

ContinueJ: AND (J)+
LD J
CMP #18 ;сравниваем J с максимально взомжонжным его значением (9+9)
BLT IterJ ;если меньше, идем дальше перебирать элементы
LD #9 
ST J
JUMP ContinueI ;иначе обнуляем индекс элементов и идем в следующий внешний массив

SkipRow: ;пропуск одного массива если идекс I нечетен
LD CurrEL
ADD #0x9
ST CurrEL

ContinueI: AND (I)+
LD I
CMP #20
BLT IterI ;сравниваем I с максимально возможным его значением (11+9), если достигло, то стоп, иначе идем дальше по массивам
HLT

MOD3: LD I ;проверка делимости на 3, просто вычитаем 3 и смотрим че получится
CONDS: BEQ TRUE
BGE MI
BLT FALSE

MI: SUB #0x3
JUMP CONDS

TRUE: LD #0
RET

FALSE: LD #1
RET

ExtSign: 
LD (CurrEL)
ADD ExtSiYo
ST (CurrEL) ;расширяем знак младшей части
LD CurrEl_St
ADD AddConst
ST CurrEl_St ;расширяем знак старшей части
JUMP Count