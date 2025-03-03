<?php
function getRandomDua() {
    $duas = [
        "اللهم إني أسألك الجنة وأعوذ بك من النار (O Allah, I ask You for Paradise and seek refuge from Hellfire).",
        "اللهم إنك عفو تحب العفو فاعف عني (O Allah, You are Most Forgiving, and You love forgiveness; so forgive me).",
        "اللهم بارك لنا في رمضان وتقبل منا الصيام والقيام (O Allah, bless us in Ramadan and accept our fasting and prayers)."
    ];
    return $duas[array_rand($duas)];
}
