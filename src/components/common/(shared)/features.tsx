import { FaTruck, FaUndo, FaLock, FaHeadset } from "react-icons/fa";
import { useTranslations } from "next-intl";

export default function Features() {
  // Translation
  const t = useTranslations();

  // Variables
  const features = [
    {
      icon: <FaTruck className="w-6 h-6" />,
      title: t("free-delivery"),
      description: t("orders-over"),
    },
    {
      icon: <FaUndo className="w-6 h-6" />,
      title: t("get-refund"),
      description: t("within-30-days-returns"),
    },
    {
      icon: <FaLock className="w-6 h-6" />,
      title: t("safe-payment"),
      description: t("100%-secure-payment"),
    },
    {
      icon: <FaHeadset className="w-6 h-6" />,
      title: t("24/7-support"),
      description: t("feel-free-to-call-us"),
    },
  ];

  return (
    <div className="container">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 container py-10 rounded-3xl bg-pink-50 my-10">
        {features.map((feature) => (
          <li key={feature.title} className="flex flex-col lg:flex-row items-center justify-center md:justify-start gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 bg-pink-900 text-white size-16 rounded-full flex items-center justify-center">
              {feature.icon}
            </div>

            {/* Content */}
            <div>
              {/* Title */}
              <h3 className="text-[#160E4B] font-bold text-lg text-center lg:text-start">{feature.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm text-center lg:text-start">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
