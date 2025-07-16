"use client";

import React from "react";

const RulesPage = () => {
  return (
    <div className="mt-5 max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center text-primary">
        Topluluk Kuralları
      </h1>
      <p className="text-muted-foreground text-center">
        Freelansup platformunu daha güvenli, saygılı ve üretken bir yer haline
        getirmek için bu kurallara lütfen uyunuz.
      </p>

      <div className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <h2 className="text-xl font-semibold text-primary">
            1. Saygı ve Nezaket
          </h2>
          <p className="text-sm text-muted-foreground">
            Tüm kullanıcılar birbirine karşı saygılı olmalı. Küfür, hakaret,
            tehdit veya ayrımcı dil kullanımı kesinlikle yasaktır.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <h2 className="text-xl font-semibold text-primary">
            2. Dolandırıcılık ve Güvensizlik
          </h2>
          <p className="text-sm text-muted-foreground">
            Sahte ilanlar, yanıltıcı bilgiler ve güven sarsıcı davranışlar ciddi
            sonuçlara yol açabilir. Gerçekçi ve dürüst olun.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <h2 className="text-xl font-semibold text-primary">
            3. Telif Hakları ve Yasalara Uyum
          </h2>
          <p className="text-sm text-muted-foreground">
            Başkalarının fikri mülkiyet haklarına saygı duyun. Yasadışı
            içerikler veya izinsiz paylaşımlar yasaktır.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <h2 className="text-xl font-semibold text-primary">
            4. Spam ve Rahatsız Edici Davranış
          </h2>
          <p className="text-sm text-muted-foreground">
            Spam mesajlar göndermek, kullanıcılara rahatsızlık vermek veya
            sistemi kötüye kullanmak yasaktır.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow border">
          <h2 className="text-xl font-semibold text-primary">
            5. Destek ve Bildirim
          </h2>
          <p className="text-sm text-muted-foreground">
            Herhangi bir kural ihlali durumunda destek ekibimize bildirerek daha
            sağlıklı bir ortam oluşmasına katkı sağlayabilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
