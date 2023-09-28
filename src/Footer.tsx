import { observer } from "mobx-react";

import s from "./Footer.module.scss";

function ERDLogo() {
    return (
        <svg width="62" height="30" viewBox="0 0 62 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.1765 21.5175L14.6062 0L0 21.523L14.6552 30L29.1765 21.5175ZM13.6951 13.6028L3.7672 19.3654L13.6951 4.57877V13.6028ZM15.5379 4.57877L25.4702 19.3654L15.5423 13.6039L15.5379 4.57877ZM23.1572 22.8917L14.5975 17.9245L12.8037 18.9726L21.3634 23.9398L19.0189 25.3085L10.4602 20.3414L8.43565 21.523L16.9954 26.4902L14.6519 27.8589L3.73455 21.523L14.5855 15.1871L25.5029 21.523L23.1572 22.8917Z" fill="#999999"/>
            <path d="M41.9412 20.3125H35.2549V9.6875H41.9412V11.6359H37.3333V14.0633H41.5018V15.9084H37.3333V18.3684H41.9412V20.3125Z" fill="#999999"/>
            <path d="M49.2559 20.3125L47.075 16.2214H45.9456V20.3125H43.7647V9.6875H48.1104C49.1776 9.6875 50.0361 9.99726 50.686 10.6168C51.3359 11.2363 51.66 12.0153 51.6583 12.9538C51.6583 13.6919 51.4467 14.3288 51.0234 14.8647C50.6002 15.4006 50.0204 15.7677 49.2842 15.9662L51.6667 20.3125H49.2559ZM45.9456 14.4379H47.7022C48.2465 14.4379 48.6727 14.303 48.981 14.0332C49.2892 13.7634 49.4435 13.4088 49.4439 12.9692C49.4439 12.5182 49.2896 12.1586 48.981 11.8905C48.6723 11.6223 48.246 11.4874 47.7022 11.4858H45.9456V14.4379Z" fill="#999999"/>
            <path d="M57.0561 20.3125H53.4902V9.6875H57.0689C58.5248 9.6875 59.7106 10.1621 60.6261 11.1113C61.5417 12.0604 61.9996 13.3591 62 15.0074C62 16.6474 61.5397 17.9412 60.6192 18.8887C59.6986 19.8363 58.511 20.3109 57.0561 20.3125ZM55.4371 18.3943H56.9868C57.8603 18.3943 58.5788 18.1044 59.1424 17.5246C59.706 16.9449 59.9878 16.1058 59.9878 15.0074C59.9878 13.909 59.706 13.0684 59.1424 12.4858C58.5788 11.9032 57.8657 11.6109 57.0029 11.6088H55.4359L55.4371 18.3943Z" fill="#999999"/>
        </svg>
    );
}

export default observer(function Footer() {
    const handleClick = (url: string) => {
        window.open(url, "_blank");
    };

    return (
        <div className={s.wrap}>
            <div className={s.container}>
                <div className={s.left}>
                    <ERDLogo />
                    <div className={s.medias}>
                        <div
                            onClick={() =>
                                handleClick("https://twitter.com/Ethereum_ERD")
                            }
                        >
                            <svg
                                width="29"
                                height="26"
                                viewBox="0 0 29 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.09572 25.0724C19.9972 25.0724 25.9598 15.7825 25.9598 7.72632C25.9598 7.46245 25.9598 7.19978 25.9425 6.93829C27.1026 6.07528 28.1039 5.00672 28.8996 3.78264C27.8179 4.27589 26.6705 4.59922 25.4954 4.74181C26.7328 3.98 27.6589 2.78164 28.1012 1.36983C26.9377 2.08001 25.6648 2.58047 24.3375 2.84961C23.4438 1.87221 22.2619 1.22502 20.9747 1.00816C19.6873 0.791301 18.3666 1.01687 17.2164 1.64995C16.0664 2.28303 15.1512 3.28836 14.6126 4.51032C14.0739 5.73228 13.9418 7.10278 14.2368 8.40974C11.8803 8.28816 9.57508 7.65825 7.47065 6.56092C5.3662 5.46359 3.50962 3.92335 2.02141 2.04019C1.26347 3.38227 1.03133 4.97104 1.37225 6.483C1.71317 7.99495 2.60152 9.31642 3.85643 10.1783C2.91315 10.1499 1.99041 9.88816 1.1663 9.41528V9.49253C1.16667 10.9001 1.64038 12.2641 2.50707 13.3534C3.37375 14.4426 4.58008 15.19 5.92141 15.4687C5.04882 15.7135 4.13328 15.7493 3.24514 15.5733C3.62404 16.7845 4.36144 17.8437 5.35427 18.6028C6.3471 19.3619 7.54572 19.7829 8.78256 19.807C7.55369 20.8004 6.1464 21.5351 4.64123 21.9687C3.13609 22.4022 1.56257 22.5264 0.0107422 22.3338C2.72128 24.123 5.8751 25.0718 9.09572 25.0676"
                                    fill="#666666"
                                />
                            </svg>
                        </div>
                        <div
                            onClick={() => handleClick("https://discord.gg/A8heyMV6qC")}
                        >
                            <svg
                                width="24"
                                height="26"
                                viewBox="0 0 24 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M20.8067 0C22.3298 0 23.5583 1.23175 23.6309 2.68125V26L20.7308 23.5376L19.1383 22.0881L17.4007 20.5736L18.1265 22.9623H2.91866C1.39983 22.9623 0.166992 21.8086 0.166992 20.28V2.68667C0.166992 1.23717 1.40199 0.00325 2.92408 0.00325H20.7991L20.8067 0ZM14.1788 6.15658H14.1463L13.9275 6.37325C16.1732 7.02325 17.2598 8.03833 17.2598 8.03833C15.8125 7.31467 14.5082 6.95283 13.2038 6.80658C12.2613 6.66033 11.3188 6.73725 10.5226 6.80658H10.3059C9.79674 6.80658 8.71341 7.02325 7.26174 7.60283C6.75583 7.82275 6.46549 7.96683 6.46549 7.96683C6.46549 7.96683 7.55099 6.88133 9.94299 6.30175L9.79674 6.1555C9.79674 6.1555 7.98541 6.08617 6.02999 7.53133C6.02999 7.53133 4.07458 10.9373 4.07458 15.1363C4.07458 15.1363 5.15791 17.0213 8.12949 17.0928C8.12949 17.0928 8.56283 16.5154 9.00158 16.0073C7.33324 15.5003 6.68324 14.4863 6.68324 14.4863C6.68324 14.4863 6.82841 14.5578 7.04616 14.703H7.11116C7.14366 14.703 7.15883 14.7192 7.17616 14.7355V14.742C7.19349 14.7593 7.20866 14.7745 7.24116 14.7745C7.59866 14.9218 7.95616 15.067 8.24866 15.2078C8.87421 15.4756 9.52852 15.6705 10.1987 15.7885C11.2062 15.9347 12.361 16.0052 13.6762 15.7885C14.3262 15.6422 14.9762 15.4992 15.6262 15.2089C16.0487 14.9922 16.5687 14.7756 17.1396 14.4105C17.1396 14.4105 16.4896 15.4245 14.7508 15.9315C15.1083 16.4363 15.6121 17.0148 15.6121 17.0148C18.5847 16.9498 19.7396 15.0648 19.8046 15.145C19.8046 10.9525 17.8383 7.54 17.8383 7.54C16.0671 6.22483 14.4096 6.175 14.1171 6.175L14.1777 6.15333L14.1788 6.15658ZM14.3608 10.9373C15.1224 10.9373 15.7367 11.5873 15.7367 12.3836C15.7367 13.1852 15.1192 13.8352 14.3608 13.8352C13.6025 13.8352 12.985 13.1853 12.985 12.3901C12.9872 11.5884 13.6057 10.9406 14.3608 10.9406V10.9373ZM9.43924 10.9373C10.1976 10.9373 10.8107 11.5873 10.8107 12.3836C10.8107 13.1852 10.1932 13.8352 9.43491 13.8352C8.67657 13.8352 8.05908 13.1853 8.05908 12.3901C8.05908 11.5884 8.67657 10.9406 9.43491 10.9406L9.43924 10.9373Z"
                                    fill="#666666"
                                />
                            </svg>
                        </div>
                        <div onClick={() => handleClick("https://docs.erd.xyz/")}>
                            <svg
                                width="23"
                                height="26"
                                viewBox="0 0 23 26"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M7.95288 18.707H14.9548C15.4826 18.707 15.9201 18.2649 15.9201 17.732C15.9201 17.1991 15.4826 16.77 14.9548 16.77H7.95288C7.42515 16.77 6.98754 17.1991 6.98754 17.732C6.98754 18.2649 7.42515 18.707 7.95288 18.707ZM12.3034 10.27H7.95288C7.42515 10.27 6.98754 10.712 6.98754 11.245C6.98754 11.7781 7.42515 12.2071 7.95288 12.2071H12.3034C12.8311 12.2071 13.2687 11.7781 13.2687 11.245C13.2687 10.712 12.8311 10.27 12.3034 10.27ZM21.4889 9.13327C21.7913 9.12978 22.1209 9.12598 22.4202 9.12598C22.742 9.12598 22.9994 9.38599 22.9994 9.71098V20.1629C22.9994 23.387 20.4123 26 17.2202 26H6.97467C3.62812 26 0.899414 23.2569 0.899414 19.877V5.86299C0.899414 2.63901 3.49942 0 6.70436 0H13.5776C13.9123 0 14.1697 0.272999 14.1697 0.598005V4.784C14.1697 7.163 16.1133 9.11299 18.4687 9.12598C19.0188 9.12598 19.504 9.1301 19.9283 9.1337C20.2586 9.13649 20.5521 9.13899 20.8113 9.13899C20.9946 9.13899 21.2321 9.13624 21.4889 9.13327ZM21.8438 7.23579C20.7857 7.23969 19.5385 7.23579 18.6415 7.22669C17.2178 7.22669 16.0453 6.04239 16.0453 4.60458V1.1778C16.0453 0.617505 16.7184 0.339299 17.1034 0.743592C17.8005 1.47583 18.7589 2.48262 19.7128 3.48455C20.6623 4.48199 21.6073 5.47459 22.2853 6.18669C22.661 6.58059 22.3857 7.23449 21.8438 7.23579Z"
                                    fill="#666666"
                                />
                            </svg>
                        </div>
                        <div
                            onClick={() =>
                                handleClick("https://github.com/Ethereum-ERD")
                            }
                        >
                            <svg
                                width="28"
                                height="28"
                                viewBox="0 0 28 28"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14 0.875C6.75281 0.875 0.875 6.90028 0.875 14.3318C0.875 20.2775 4.63531 25.3215 9.85141 27.1012C10.5066 27.2257 10.7188 26.8085 10.7188 26.4541V23.9489C7.06781 24.7631 6.30766 22.361 6.30766 22.361C5.71047 20.8056 4.84969 20.3919 4.84969 20.3919C3.65859 19.5564 4.94047 19.5744 4.94047 19.5744C6.25844 19.6685 6.95187 20.9615 6.95187 20.9615C8.12219 23.0182 10.022 22.4238 10.7712 22.0796C10.8883 21.2105 11.2284 20.6161 11.6047 20.2808C8.68984 19.9388 5.62516 18.7849 5.62516 13.6298C5.62516 12.1597 6.13813 10.9598 6.97703 10.0178C6.84141 9.67799 6.39187 8.30876 7.105 6.45621C7.105 6.45621 8.2075 6.09512 10.7155 7.83553C11.7622 7.53724 12.8844 7.38809 14 7.38249C15.1156 7.38809 16.2389 7.53724 17.2878 7.83553C19.7936 6.09512 20.8939 6.45621 20.8939 6.45621C21.6081 8.30988 21.1586 9.67911 21.023 10.0178C21.8652 10.9598 22.3737 12.1608 22.3737 13.6298C22.3737 18.7983 19.3036 19.9366 16.3811 20.2696C16.8514 20.6868 17.2812 21.5054 17.2812 22.7614V26.4541C17.2812 26.8119 17.4912 27.2324 18.1573 27.1001C23.3691 25.3182 27.125 20.2752 27.125 14.3318C27.125 6.90028 21.2483 0.875 14 0.875Z"
                                    fill="#666666"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className={s.disclaimerLinks}>
                    <p
                        onClick={() =>
                            handleClick(
                                "https://disclaimer.erd.xyz/website-disclaimer"
                            )
                        }
                    >
                        ERD Website Disclaimer
                    </p>
                    <p
                        onClick={() =>
                            handleClick(
                                "https://disclaimer.erd.xyz/protocol-disclaimer"
                            )
                        }
                    >
                        ERD Protocol Disclaimer
                    </p>
                </div>
            </div>
        </div>
    );
});
