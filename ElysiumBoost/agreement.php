<?php
// Инициализируем сессию
session_start();
// Функция проверки, авторизован ли пользователь
function isLoggedIn()
{
    return isset($_SESSION['user_id']) && $_SESSION['user_id'];
}
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>ELYSIUM BOOST | USER AGREEMENT</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>

    <?php
        include 'blocks/nav.php';
    ?>
    <div class="wrapper agreement_content">
        <div class="agreement">
            <h1 class="agreement_title">Пользовательское соглашение</h1>
            <div class="special_agreement">
                <p>
                    Данное пользовательское соглашение регулирует отношения между физическим лицом, именуемым в
                    дальнейшем – «Клиент» и сервисом CRY STUDIO в
                    части оказываемых услуг. Оформляя заказ на сайте, клиент подтверждает свое согласие и принимает
                    условия пользовательского соглашения,
                    в соответствии с пунктом 2 статьи 437 Гражданского кодекса Российской Федерации (ГК РФ) в случае
                    принятия изложенных ниже условий и
                    оплаты услуг физическое лицо, производящее акцепт настоящей оферты, становится Клиентом-Заказчиком
                    (в соответствии с пунктом 3 статьи 438
                    ГК РФ акцепт оферты равносилен заключению договора на условиях, изложенных в оферте), а Продавец и
                    Клиент совместно — Сторонами настоящего договора. </p>
                <p>
                    Акцепт настоящего пользовательского соглашения осуществляется путём совершения Клиентом фактических
                    действий, свидетельствующих о его намерении и желании вступить в правоотношения с Администрацией
                    Сайта. К указанным фактическим действиям относится оплата Клиентом стоимости товара или услуг.
                    Акцепт данного соглашения, означает ознакомление, понимание всех вместе и каждого в отдельности
                    условия договора, полное, безусловное и безоговорочное согласие Клиента с положениями и
                    требованиями, определёнными в пользовательском соглашении. </p>
                <p>
                    С момента принятия пользовательского соглашения между Администрацией Сайта и Клиентом признается
                    заключенным и согласованным, а его условия подлежат обязательному исполнению Сторонами. </p>
                <p>
                    <b>1. ТЕРМИНЫ, ИСПОЛЬЗУЕМЫЕ В ПОЛЬЗОВАТЕЛЬСКОМ СОГЛАШЕНИИ</b>
                </p>
                <p>
                    1.1. Ниже приведенные термины, которые используются в следующем значении: </p>
                <p>
                    1.1.1. Сайт – веб-сайт, принадлежащий Администрации Сайта и расположенный в сети Интернет под
                    доменным именем (адресом) – www.crymoooreee.ru, а также входящие в его состав производные
                    веб-страницы, обеспечивающие взаимодействие Клиента с Продавцом через электронные каналы связи, в
                    том числе в целях осуществления передачи Товара Клиенту и взаиморасчетов между Клиентом и Продавцом.
                </p>
                <p>
                    1.1.2. Продавец – Администрация Сайта или любое третье лицо, от имени и в интересах которого
                    действует Администрация Сайта. Администрация сайта выступает в роли агента по продаже товаров, услуг
                    и сама не является собственником продаваемых товаров/услуг. Сайт действует как торговая площадка.
                </p>
                <p>
                    1.1.3. Покупатель – физическое лицо, осуществляющее покупку товара, и/или услуги на сайте. </p>
                <p>
                    1.1.4. Товар – Игровые учетные записи и E-mail данного аккаунта. </p>
                <p>
                    1.1.5. Услуги – Любые игровые офферы по повышению рейтинга и/или уровня игровых аккаунтов. </p>
                <p>
                    1.1.6. Игровой аккаунт – сочетание уникального имени (логина) и пароля пользователя в
                    соответствующей компьютерной игре или программе (учетная запись пользователя в компьютерной игре или
                    программе), необходимое для входа и использования соответствующей компьютерной игры или программы, в
                    том числе с применением достижений, уровня, навыков и т.д., достигнутых пользователем, которому
                    первоначально принадлежала данная учетная запись. </p>
                <p>
                    1.1.7. Договор купли-продажи Товара – соглашение между Продавцом и Клиентом, в рамках которого
                    Продавец передает, а Клиент за плату (на возмездной основе) принимает права на использование Товара
                    в соответствии с его основным назначением. </p>
                <p>
                    1.1.8. Заказ – заявка Клиента на любые услуги, оформленная через Сайт и представляющая собой
                    свободное и самостоятельное намерение Клиента заказать у Продавца данные услуги. </p>
                <p>
                    1.2.0. Электронная почта (E-mail) – специальная технология, которая обеспечивает пересылку и
                    получение электронных сообщений, писем, файлов, документов и т.д. посредством использования
                    информационно-телекоммуникационной сети Интернет. </p>
                <p>
                    1.2.1. В Пользовательском Соглашении могут быть использованы термины, не определенные в пункте 1.1.
                    настоящей Оферты. В этих случаях толкование терминов производится в соответствии с текстом и смыслом
                    данной Оферты. В случае отсутствия однозначного толкования термина в тексте пользовательского
                    соглашения, следует руководствоваться, во-первых, толкованием терминов, применяемым на Сайте, в том
                    числе в юридической документации, размещенной на Сайте; во-вторых, законодательством Российской
                    Федерации и обычаями деловой практики в соответствующей сфере деятельности. </p>
                <p>
                    <b>2. ПРЕДМЕТ ПОЛЬЗОВАТЕЛЬСКОГО СОГЛАШЕНИЯ</b>
                </p>
                <p>
                    2.1. По настоящей Оферте Администрация Сайта, действуя от своего имени или от имени Продавца,
                    осуществляет продажу товаров и услуг через Сайт Клиентам, а Клиент оплачивает данный Товар в
                    размере, на условиях и в порядке, установленных в настоящей Оферте. </p>
                <p>
                    2.2. Наименование, ассортимент и вид Товара, его описание, стоимость и способы оплаты, а также иные
                    условия, указываются на Сайте на соответствующей веб-странице Товара. </p>
                <p>
                    2.3. Товар предоставляется Клиенту в соответствии с характеристиками и параметрами, указанными в
                    описании Товара на соответствующей веб-странице. На момент продажи (передачи) Товара Администрация
                    Сайта гарантирует качество и работоспособность Товара. </p>
                <p>
                    2.4. Стороны соглашаются с тем, что понятие "Надежность аккаунта" является следствием определенной
                    меры материальной ответственности Администрации Сайта перед Клиентом за продаваемый Товар (п.7.1).
                </p>
                <p>
                    2.5. После покупки игрового аккаунта - Товара, Администрация Сайта не несет ответственность за
                    последствия возникновения проблем с доступом к игровому аккаунту. </p>
                <p>
                    2.6 Услуги предоставляются Клиенту в соответствии с правилами оказываемых услуг. </p>
                <p>
                    2.7. Если Администрация Сайта не исполнила заказ клиента в оговоренные сроки, то клиент может
                    потребовать возврата перечисленных средств, в части невыполненных условий (возврат средств за
                    недобусченный ММР). Возврат производится только на баланс аккаунта на сайте. </p>
                <p>
                    2.8. Сроки оказания услуг на сайте являются приблизительными и могут быть увеличены в зависимости от
                    загруженности сервиса. Администрация сайта имеет право к оговоренным срокам на сайте добавить 10
                    дней для завершения заказа Клиента. </p>
                <p>
                    <b>3. ПРАВА И ОБЯЗАННОСТИ СТОРОН</b>
                </p>
                <p>
                    3.1. Права и обязанности Администрации Сайта: </p>
                <p>
                    3.1.1. Администрация Сайта обязуется по запросу Клиента консультировать последнего по технической
                    стороне использования Сайта и приобретения Товара. </p>
                <p>
                    3.1.2. Администрация Сайта обязуется рассматривать и проверять мотивированные претензии, поступающие
                    от Клиентов в течение месяца с момента поступления таковых. </p>
                <p>
                    3.1.3. Администрация Сайта обязуется поддерживать Сайт в работоспособном состоянии. </p>
                <p>
                    3.1.4. Администрация Сайта вправе без предварительного уведомления об этом Клиента удалить с Сайта
                    информацию о том или ином Товаре. </p>
                <p>
                    3.1.5. Администрация Сайта вправе отказать Клиенту в исполнении его Заказа без объяснения причин.
                </p>
                <p>
                    3.1.6. Администрация Сайта вправе проверять информацию о Товаре, предоставленную Продавцом,
                    осуществлять предварительную модерацию Товара, информация о котором размещается на Сайте. </p>
                <p>
                    3.1.7. Администрация Сайта вправе для выполнения своих обязательств по настоящей Оферте привлекать
                    третьих лиц, оставаясь ответственным за осуществляемые ими действия и принимаемые решения как за
                    свои собственные. </p>
                <p>
                    3.1.8. Администрация Сайта вправе проводить профилактические работы на Сайте, в связи с чем в
                    указанное время Сайт может быть недоступен для использования. </p>
                <p>
                    3.2. Права и обязанности Клиента: </p>
                <p>
                    3.2.1. Клиент обязуется оплачивать стоимость товара и/или услуг определяемую в соответствии с
                    условиями настоящей Оферты. </p>
                <p>
                    3.2.2. Клиент обязуется незамедлительно уведомлять Администрацию Сайта о наличии претензий к Товару,
                    не предпринимая никаких действий (в т.ч. оставления негативных отзывов до принятия решения по
                    проблеме), направленных на самостоятельное устранение недостатков. В случаях, когда клиент
                    предпринимает попытки самостоятельного решения проблемы или обращается с претензией спустя 24 часа
                    после выявления таковой, Администрация сайта вправе отказать в гарантийной компенсации стоимости
                    Товара или в его замене. </p>
                <p>
                    3.2.3. Клиент обязуется ознакомиться с описанием Товара, его характеристиками и условиями продажи
                    перед покупкой (приобретением) Товара. </p>
                <p>
                    3.2.4. Клиент обязуется ознакомиться с мерами безопасности использования товара и услуг перед
                    покупкой на веб-странице и строго выполнить действия, направленные на обеспечение безопасности
                    Товара: </p>
                <ul>
                    <li>- После оплаты и проверки Товара сменить пароль на E-mail аккаунта, и, если возможно, сменить
                        ответ на секретный вопрос;</li>
                    <li>- Добавить свой сотовый мобильный телефон для E-mail (привязать личный мобильный телефон);</li>
                    <li>- Сохранить данную почту;</li>
                    <li>- Сменить пароль в аккаунте Steam, а так же сменить почту в аккаунте Steam на свою личную;</li>
                </ul>
                <p>
                    3.2.5. Клиент обязуется самостоятельно и своевременно знакомиться со всей информацией, размещаемой
                    на Сайте, а также в уведомлениях, поступающих на адрес электронной почты Клиента. </p>
                <p>
                    3.2.6. Клиент имеет право самостоятельно выбирать Товар из перечня Товаров, предложенных на Сайте.
                </p>
                <p>
                    3.2.7. Клиент имеет право самостоятельно определять способ оплаты Товара из перечня способов оплаты,
                    предложенных на Сайте. </p>
                <p>
                    3.2.8. Настоящим Клиент дает свое согласие Администрации Сайта на направление в его адрес, на
                    электронную почту Клиента любых информационных сообщений, уведомлений и т.д. </p>
                <p>
                    3.2.9. Настоящим Клиент понимает и соглашается, что внутренней политикой производителя компьютерной
                    игры (Valve) или программы (Steam) могут быть установлены ограничения на передачу Игрового аккаунта
                    и/или искусственному повышению рейтинга, в связи с чем со стороны производителя могут проводиться
                    мероприятия по блокировке соответствующих пользователей, использующих данный товар или услугу,
                    направленные на недопущение использования компьютерной игры или программы. Администрация Сайта не
                    несет ответственность в указанной части, а Клиент обязуется не предъявлять к ней претензии или
                    требования, самостоятельно неся все негативные последствия указанных ограничений со стороны
                    производителя. Иными словами передача, покупка, буст запрещены пользовательским соглашением Steam.
                    Администрация сайта CRY STUDIO не несет ответственность за возможные блокировки и иные ограничения
                    со стороны Steam. </p>
                <p>
                    3.2.9.1. CRY STUDIO отказывается от любых претензий по факту блокировки учетной записи со стороны
                    Valve. </p>
                <p>
                    3.2.10. При покупке Товара Клиент обязуется действовать добросовестно и не злоупотреблять своими
                    правами, в частности не приобретать Товар с целью вымогательства иного Товара или совершения иных
                    недобросовестных действий, причиняющих ущерб, убытки или затраты для Администрации Сайта или
                    Продавца. </p>
                <p>
                    <b>4. РАСЧЕТЫ МЕЖДУ СТОРОНАМИ</b>
                </p>
                <p>
                    4.1. Стоимость товаров и услуг определяется по усмотрению Администрации Сайта. </p>
                <p>
                    4.2. Стоимость товара и услуг не включает в себя комиссии, взимаемые платежными системами, с
                    использованием которых производится оплата. </p>
                <p>
                    4.3. Основанием для оплаты стоимости товара или услуг является Заказ Клиента. </p>
                <p>
                    4.4. Оплата стоимости товара или услуг производится Клиентом способами, установленными в
                    соответствии с техническим и технологическим устройством Сайта и указанными на нем. </p>
                <p>
                    4.5. Оплата стоимости Товара или Услуг производится Клиентом на условиях 100% (стопроцентной)
                    предварительной оплаты. </p>
                <p>
                    4.6. Датой оплаты признается дата поступления средств в распоряжение Администрации Сайта. </p>
                <p>
                    4.7. Администрация Сайта вправе без объяснения причин и без предварительного уведомления Клиентов в
                    одностороннем порядке изменять стоимость Товаров путем публикации новой стоимости Товара на Сайте.
                </p>
                <p>
                    4.8. Администрация Сайта обладает правом на установление минимальной стоимости на тот или иной
                    Товар. </p>
                <p>
                    <b>
                        5. ПОРЯДОК ПОКУПКИ И ПЕРЕДАЧИ ТОВАРА КЛИЕНТУ </b>
                </p>
                <p>
                    5.1. Покупка Товара Клиентом осуществляется в следующей последовательности: </p>
                <p>
                    5.1.1. Выбор Товара Клиентом из перечня Товаров, предложенных на Сайте, и нажатие на кнопку «Купить»
                    на веб-странице с описанием соответствующего Товара. </p>
                <p>
                    5.1.2. Выбор способа оплаты и совершение иных сопутствующих действий, необходимых в связи с
                    требованиями соответствующей выбранной платежной системы. </p>
                <p>
                    5.1.3. Передача Товара Клиенту производится путем направления ему электронного письма с данными.
                    Электронное письмо может быть в папке “спам”. </p>
                <p>
                    5.2. Передача Товара Клиенту производится только при условии его 100 % (стопроцентной)
                    предварительной оплаты Клиентом. </p>
                <p>
                    5.3. Администрация Сайта считается исполнившей свои обязательства по настоящей Оферте с момента
                    направления Клиенту электронного письма </p>
                <p>
                    5.4 На нашем сайте вы можете оплатить товар банковской картой Visa, MasterCard или Мир. После
                    подтверждения выбранного товара откроется защищенное окно со страницей платёжного агрегатора
                    платежей, где Вам необходимо ввести данные Вашей банковской карты. Для дополнительной аутентификации
                    держателя карты используется протокол 3D Secure. Если Ваш банк поддерживает данную технологию, Вы
                    будете перенаправлены на его сервер для дополнительной идентификации. Информацию о правилах и
                    методах дополнительной идентификации уточняйте, пожалуйста, в банке, выдавшем Вам банковскую карту.
                </p>
                <p>
                    5.4.1 Процессинговый центр агрегаторов защищает и обрабатывает данные Вашей банковской карты по
                    максимальному международному стандарту безопасности — Payment Card Industry Data Security Standard
                    3.2 level 1 (сокращенно PCI DSS). Этот стандарт разработан платёжными системами Visa и MasterCard.
                    Каждый год сертифицированные аудиторы проверяют, соответствует ли процессинговый центр всем
                    требованиям и после этого выдают сертификат. <br>
                    Передача информации в платёжный шлюз происходит с применением технологии шифрования TLS. Дальнейшая
                    передача информации происходит по закрытым банковским сетям, имеющим наивысший уровень надежности.
                    Платежные агрегаторы не передают данные Вашей карты нам и иным третьим лицам. Для дополнительной
                    аутентификации держателя карты используется протокол 3D Secure. <br>
                    Предоставляемая Вами персональная информация (имя, адрес, телефон, email, номер кредитной карты)
                    является конфиденциальной и не подлежит разглашению. Данные Вашей кредитной карты передаются только
                    в зашифрованном виде и не сохраняются на нашем сервере. <br>
                    В случае, если у Вас есть вопросы по совершенному платежу, Вы можете обратиться в службу поддержки
                    того платежного агрегатора, где был совершен платеж. </p>
                <p>
                    <b>6. ПРЕТЕНЗИИ КЛИЕНТОВ</b>
                </p>
                <p>
                    6.1. Клиент обязуется максимально подробно ознакомиться с Товаром и Услугами на сайте перед его
                    покупкой, в частности изучить описание, опубликованное на соответствующей веб-странице. Претензии,
                    связанные и обусловленные не ознакомлением/ненадлежащим ознакомлением Клиентом с описанием Товара,
                    не принимаются Администрацией Сайта и подлежат отклонению. </p>
                <p>
                    6.2. Настоящим Стороны установили, что проверка качества Товара и предъявление претензий Клиентом в
                    указанной части осуществляется Клиентом в течение 20 (двадцати) минут с момента получения Товара
                    Клиентом. Данного времени вполне достаточно для проверки корректности данных для авторизации в
                    Игровом аккаунте и на почте Email данного аккаунта.
                    По истечении указанного срока какие-либо претензии от Клиента не принимаются и подлежат отклонению.
                </p>
                <p>
                    6.5. Претензии клиентов к услугам по повышению рейтинга не принимаются, если: </p>
                <ul>
                    <li>Заказ был выполнен. (Забущен до конечного рейтинга +/- 10 ММР)</li>
                    <li>Не вышли сроки оказания услуг с учетом дополнительных 10 дней.</li>
                </ul>
                <p>
                    6.6. Порядок разрешения иных требований и претензий Клиента может устанавливаться в тексте
                    настоящего пользовательского соглашения. </p>
                <p>
                    <b>
                        7. ОТВЕТСТВЕННОСТЬ СТОРОН </b>
                </p>
                <p>
                    7.1. Администрация Сайта не несет материальную ответственность за приобретаемый Клиентом Товар с
                    момента покупки. </p>
                <p>
                    7.2. Администрация сайта не несет ответственность за инвентарь аккаунта. Рекомендуется передавать
                    вещи на другой аккаунт, при оформлении заказа на буст рейтинга. </p>
                <p>
                    7.2.1 Во время выполнения заказа на буст рейтинга, инвентарь пользователя страхуется на сумму 2500
                    рублей и в случае возникновения страхового случая (пропажа вещей) администрация сайта, выплачивает
                    фиксированную страховую сумму: 2 500 рублей. В случае, если стоимость Вашего аккаунта превышает 2
                    500 рублей, рекомендуем передать наиболее дорогие вещи на другой аккаунт. </p>
                <p>
                    7.3. Товар, приобретаемый (покупаемый) Клиентом, предоставляется по принципу «как есть» (as is). При
                    этом Администрация Сайта не несет ответственность в какой бы то ни было форме за несоответствие
                    Товара целям, задачам, представлениям или желаниям Клиента. </p>
                <p>
                    7.4. Ничто в настоящем пользовательском соглашении не может гарантировать для Клиента полное
                    удовлетворение его интересов и потребностей, связанных с покупкой Товара или Услуги. </p>
                <p>
                    7.5. Администрация Сайта не несет ответственности за убытки и расходы, возникшие у Клиента, в
                    частности: </p>
                <p>
                    7.5.1. убытки и расходы, вызванные действиями/бездействием третьих лиц. </p>
                <p>
                    7.5.2. убытки и расходы, возникшие в связи со сбоями и перерывами в работе Сайта. </p>
                <p>
                    7.5.3. убытки и расходы, возникшие в связи с воздействием компьютерных вирусов, «троянов», «червей»
                    и т.д. </p>
                <p>
                    7.5.4. убытки и расходы, связанные с блокировкой пользователя, использующего Товар после его продажи
                    вне зависимости от причины блокировки. </p>
                <p>
                    7.6. Администрация Сайта не несет ответственности за утрату Клиентом данных об Игровом аккаунте, а
                    также не несет ответственность за все негативные последствия, вытекающие и связанные с такой
                    утратой. </p>
                <p>
                    7.7. Сайт выполняет посреднические функции по продаже игровых аккаунтов и не несет ответственность
                    за потерю и/или ненадлежащее качество товара. </p>
                <p>
                    7.8 При возникновении проблем с купленным аккаунтом (невозможность дальнейшего использования
                    аккаунта) администрация сайта выполняет следующие действия: </p>
                <p>
                    7.8.1 Обязуется предоставить данные владельца аккаунта для предъявления ему претензии. </p>
                <p>
                    7.8.2 Администрация сайта оставляет за собой право сделать возврат потраченных средств в пользу
                    покупателя в случае возникновения проблемы с учетной записью не связанной с блокировкой, по формуле:
                    цена аккаунта, умноженная на комиссионный сбор и минус сумма выплаты, произведенная владельцу
                    аккаунта за продажу. </p>
                <ul>
                    <li>Цена аккаунта: сумма которую потратил клиент, на покупку аккаунта.</li>
                    <li>Комиссионный сбор: сумма взимаемая за размещение аккаунта на сайте, размер которой зависит от
                        момента возникновения проблем с аккаунтом.</li>
                    <li>Сумма выплаты: сумма оплаченная владельцу аккаунта за продажу.</li>
                </ul>
                <p>
                    Итоговая сумма подлежит возврату на баланс сайта CRY STUDIO. (Согласно п. 2.7) </p>
                <ul>
                    <li>Размер комиссионного сбора определяется моментом возникновения проблемы с учетной записью. Так,
                        если проблема с аккаунтом возникла через:</li>
                    <ul>
                        <li>1-30 дней с момента покупки на сайте, взимается комиссионный сбор 0%</li>
                        <li>31-60 дней с момента покупки на сайте, взимается комиссионный сбор 10%</li>
                        <li>61-90 дней с момента покупки на сайте, взимается комиссионный сбор 15%</li>
                        <li>90-180 и более дней с момента покупки на сайте, взимается комиссионный сбор 20%</li>
                        <li>180-360 и более дней с момента покупки на сайте, взимается комиссионный сбор 25%</li>
                        <li>360 и более дней с момента покупки на сайте, взимается комиссионный сбор 30%</li>
                    </ul>
                </ul>
                <p>
                    <b>
                        8. Политика в отношении обработки персональных данных </b>
                </p>
                <p>
                    Настоящая политика обработки персональных данных составлена в соответствии с требованиями
                    Федерального закона от 27.07.2006.
                    №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по
                    обеспечению безопасности персональных данных
                    CRY STUDIO (далее – Оператор). Оператор ставит своей важнейшей целью и условием осуществления своей
                    деятельности соблюдение прав и
                    свобод человека и гражданина при обработке его персональных данных, в том числе защиты прав на
                    неприкосновенность частной жизни,
                    личную и семейную тайну. Настоящая политика Оператора в отношении обработки персональных данных
                    (далее – Политика) применяется ко
                    всей информации, которую Оператор может получить о посетителях веб-сайта https://crymoooreee.ru.
                </p>
                <p class="text-center">
                    <b>Основные понятия, используемые в Политике:</b>
                </p>
                <p>
                    Автоматизированная обработка персональных данных – обработка персональных данных с помощью средств
                    вычислительной техники; </p>
                <p>
                    Блокирование персональных данных – временное прекращение обработки персональных данных (за
                    исключением случаев, если обработка необходима для уточнения персональных данных); </p>
                <p>
                    Веб-сайт – совокупность графических и информационных материалов, а также программ для ЭВМ и баз
                    данных, обеспечивающих их доступность в сети интернет по сетевому адресу https://crymoooreee.ru;
                </p>
                <p>
                    Информационная система персональных данных — совокупность содержащихся в базах данных персональных
                    данных, и обеспечивающих их обработку информационных технологий и технических средств; </p>
                <p>
                    Обезличивание персональных данных — действия, в результате которых невозможно определить без
                    использования дополнительной информации принадлежность персональных данных конкретному Пользователю
                    или иному субъекту персональных данных; </p>
                <p>
                    Обработка персональных данных – любое действие (операция) или совокупность действий (операций),
                    совершаемых с использованием средств автоматизации или без использования таких средств с
                    персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение
                    (обновление, изменение), извлечение, использование, передачу (распространение, предоставление,
                    доступ), обезличивание, блокирование, удаление, уничтожение персональных данных; </p>
                <p>
                    Оператор – государственный орган, муниципальный орган, юридическое или физическое лицо,
                    самостоятельно или совместно с другими лицами организующие и (или) осуществляющие обработку
                    персональных данных, а также определяющие цели обработки персональных данных, состав персональных
                    данных, подлежащих обработке, действия (операции), совершаемые с персональными данными; </p>
                <p>
                    Персональные данные – любая информация, относящаяся прямо или косвенно к определенному или
                    определяемому Пользователю веб-сайта https://crymoooreee.ru; </p>
                <p>
                    Пользователь – любой посетитель веб-сайта https://crymoooreee.ru; </p>
                <p>
                    Предоставление персональных данных – действия, направленные на раскрытие персональных данных
                    определенному лицу или определенному кругу лиц; </p>
                <p>
                    Распространение персональных данных – любые действия, направленные на раскрытие персональных данных
                    неопределенному кругу лиц (передача персональных данных) или на ознакомление с персональными данными
                    неограниченного круга лиц, в том числе обнародование персональных данных в средствах массовой
                    информации, размещение в информационно-телекоммуникационных сетях или предоставление доступа к
                    персональным данным каким-либо иным способом; </p>
                <p>
                    Трансграничная передача персональных данных – передача персональных данных на территорию
                    иностранного государства органу власти иностранного государства, иностранному физическому или
                    иностранному юридическому лицу; </p>
                <p>
                    Уничтожение персональных данных – любые действия, в результате которых персональные данные
                    уничтожаются безвозвратно с невозможностью дальнейшего восстановления содержания персональных данных
                    в информационной системе персональных данных и (или) результате которых уничтожаются материальные
                    носители персональных данных. </p>
                <p>
                    <b>
                        8.1.1. Оператор может обрабатывать следующие персональные данные Пользователя: </b>
                </p>
                <p>
                    8.1.2 Фамилия, имя, отчество; </p>
                <p>
                    8.1.3 Номер телефона; </p>
                <p>
                    8.1.4 Адрес электронной почты; </p>
                <p>
                    8.1.5 Также на сайте происходит сбор и обработка обезличенных данных о посетителях (в т.ч. файлов
                    «cookie») с помощью сервисов интернет-статистики (Яндекс Метрика и Гугл Аналитика и других). </p>
                <p>
                    8.1.6 Вышеперечисленные данные далее по тексту Политики объединены общим понятием Персональные
                    данные. </p>
                <p>
                    <b>
                        8.2.1. Цели обработки персональных данных </b>
                </p>
                <p>
                    8.2.2 Цель обработки персональных данных Пользователя — информирование Пользователя посредством
                    отправки электронных писем; заключение, исполнение и прекращение гражданско-правовых договоров;
                    предоставление доступа Пользователю к сервисам, информации и/или материалам, содержащимся на
                    веб-сайте. </p>
                <p>
                    8.2.3 Также Оператор имеет право направлять Пользователю уведомления о новых продуктах и услугах,
                    специальных предложениях и различных событиях. Пользователь всегда может отказаться от получения
                    информационных сообщений, направив Оператору письмо на адрес электронной почты info@crymoooreee.ru с
                    пометкой «Отказ от уведомлениях о новых продуктах и услугах и специальных предложениях». </p>
                <p>
                    8.2.4 Обезличенные данные Пользователей, собираемые с помощью сервисов интернет-статистики, служат
                    для сбора информации о действиях Пользователей на сайте, улучшения качества сайта и его содержания.
                </p>
                <p>
                    <b>
                        8.3.1. Правовые основания обработки персональных данных </b>
                </p>
                <p>
                    8.3.2 Оператор обрабатывает персональные данные Пользователя только в случае их заполнения и/или
                    отправки Пользователем самостоятельно через специальные формы, расположенные на сайте
                    https://crymoooreee.ru </p>
                <p>
                    8.3.3 Заполняя соответствующие формы и/или отправляя свои персональные данные Оператору,
                    Пользователь выражает свое согласие с данной Политикой. </p>
                <p>
                    8.3.4 Оператор обрабатывает обезличенные данные о Пользователе в случае, если это разрешено в
                    настройках браузера Пользователя (включено сохранение файлов «cookie» и использование технологии
                    JavaScript) </p>
                <p>
                    8.3.5 Безопасность персональных данных, которые обрабатываются Оператором, обеспечивается путем
                    шифрования данных в закрытой базе. </p>
                <p>
                    8.3.6 Оператор обеспечивает сохранность персональных данных и принимает все возможные меры,
                    исключающие доступ к персональным данным неуполномоченных лиц. </p>
                <p>
                    8.3.7 Оператор не несет ответственность за действия и/или бездействия третьих лиц, в результате
                    которых могут быть использованы персональные данные пользователей. </p>
                <p>
                    8.3.8 В случае выявления неточностей в персональных данных, Пользователь может актуализировать их
                    самостоятельно, путем направления Оператору уведомление на адрес электронной почты Оператора
                    info@crymoooreee.ru с пометкой «Актуализация персональных данных». </p>
                <p>
                    <b>
                        9. ДЕЙСТВИЕ ПОЛЬЗОВАТЕЛЬСКОГО СОГЛАШЕНИЯ </b>
                </p>
                <p>
                    9.1. Публичное соглашение вступает в силу с момента ее размещения в сети Интернет на Сайте,
                    указанном в пункте 1.1.1. данной Оферты. </p>
                <p>
                    9.2. Настоящая Оферта размещена на неопределенный срок и утрачивает свою силу при ее аннулировании
                    Администрацией Сайта. </p>
                <p>
                    9.3. В случае внесения изменений в Оферту, такие изменения вступают в силу с момента опубликования
                    новой редакции Оферты на Сайте, если иной срок вступления изменений в силу не определен
                    дополнительно при их публикации. Администрация Сайта вправе в одностороннем порядке осуществлять
                    внесение изменений в текст Оферты. </p>
                <p>
                    9.4. Клиент обязуется самостоятельно осуществлять контроль за изменениями в положения настоящей
                    Оферты и несет ответственность и негативные последствия, связанные с несоблюдением данной
                    обязанности. </p>
                <p>
                    9.5. При несогласии Клиента с соответствующими изменениями Клиент обязан прекратить использование
                    Сайта и отказаться от услуг, предоставляемых Администрацией Сайта. В противном случае продолжение
                    использования Клиентом Сайта означает, что Клиент согласен с условиями Оферты в новой редакции. </p>
                <p>
                    9.6. Актуальная версия Оферты расположена на Сайте по адресу: <a
                        href="agreement.php">https://elysiumboos.ru/agreement.php</a>
                </p>
            </div>
        </div>
    </div>
    <?php
        include 'blocks/footer.php';
    ?>
</body>

</html>