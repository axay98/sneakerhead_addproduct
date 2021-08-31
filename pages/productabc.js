import {DPage} from './Property.js'
import en from '../components/ui/lang/en';
import fr from '../components/ui/lang/fr';
import { useRouter } from "next/router";

const Productabc = ({ data }) =>
{ 
    const router = useRouter();
  const { locale } = router;
  const t = locale === 'en' ? en : fr;  

    return (
        <div>
            <div>
                <p>{t.DescPage}</p>
            </div>
        </div>

    );
}

export default Productabc;