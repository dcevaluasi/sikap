import Cookies from "js-cookie"

export const checkOperatorPusat = () => {
    const value = Cookies.get('Eselon');
    return value?.includes('Operator Pusat Pelatihan KP')
}