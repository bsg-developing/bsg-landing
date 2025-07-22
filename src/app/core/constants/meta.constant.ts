export interface MetaEntry {
  title: string;
  description: string;
  keywords: string;
}

export const META_INFO: Record<string, MetaEntry> = {
  ru: {
    title: 'Solterprise | Мы создаём цифровой бизнес',
    description: 'Solterprise — команда, которой доверяют. Создание сайтов, SEO, поддержка. Работаем по Молдове и за её пределами. ☎ +373 79 294 106.',
    keywords: 'Solterprise, автоматизация бизнеса, бизнес решения, ERP, CRM, eCommerce, digital transformation, разработка ПО, корпоративное ПО, бизнес-платформа, IT консалтинг, цифровизация, управление бизнесом, системы учета, веб-разработка, enterprise software'
  },
  en: {
    title: 'Solterprise | We Build Digital Business',
    description: 'Solterprise — a team you can trust. Website development, SEO, support. We work across Moldova and beyond. ☎ +373 79 294 106.',
    keywords: 'Solterprise, business automation, business solutions, ERP, CRM, eCommerce, digital transformation, software development, enterprise software, business platform, IT consulting, digitization, business management, accounting systems, web development'
  },
  ro: {
    title: 'Solterprise | Construim afaceri digitale',
    description: 'Solterprise — o echipă de încredere. Creare site-uri, SEO, suport. Activăm în toată Moldova și în afara ei. ☎ +373 79 294 106.',
    keywords: 'Solterprise, automatizarea afacerii, soluții business, ERP, CRM, eCommerce, transformare digitală, dezvoltare software, platforme de afaceri, consultanță IT, digitalizare, managementul afacerii, sisteme de contabilitate, dezvoltare web'
  }
};
