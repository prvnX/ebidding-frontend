import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

export default () => {
    const { t } = useTranslation();
    return (
        <div className="col-span-3 text-center text-gray-500">
            <FontAwesomeIcon icon={faSpinner} spin className="text-8xl" />
            <h2 className="text-xl mb-3 font-semibold">  {t("loading")}</h2>
            <p>{t("pleaseWait")}</p>
        </div>
    );
}