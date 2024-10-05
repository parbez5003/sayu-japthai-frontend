import React from 'react'
import newsLatterImage from "../../assets/images/newsletterOR1.jpg"
import SectionTitle from '../../Components/Shared/SectionTitle/SectionTitle'

export default function NewsLatter() {
    return (
        <>
            <SectionTitle heading={"Découvrez nos plats fait maison"} subHeading={"Nous n'avons pas de sur place pour le moment mais ne vous inquiétez pas vous pouvez goûter nos meilleurs sushi et thaï en commandant sur notre site . Vous pouvez également bénéficier de moins 15% a emporter."} />

            <div className=" container mx-auto px-1">
                <div className=" flex flex-col gap-3 sm:flex-row items-center justify-around py-5 drop-shadow-sm  rounded-lg  w-full lg:px-2 ">
                    <div className="flex md:w-1/2 justify-center flex-col gap-3 px-2">
                        <h2 className="text-lg md:text-xl lg:text-2xl  text-start  fonts-semibold">
                            vous pouvez ajouter juste une fois la même plat à partir de la page d'accueil

                            mais bonne nouvelle  vous pouvez ajuster  la quantité et ajouter plusieurs fois la même plat à partir de l'option quantité de votre panier
                        </h2>
                        <p className="text-base md:text-lg text-gray-400 fonts-normal">
                            Le site est en cours de construction mais fonctionne bien pour commander.si vous voulez l'assistance pour placer les commandes appelez nous .☎

                            <br />  Vous pouvez souscrire pour recevoir les coupons de réduction et recevoir les nouvelles pour la promotion.
                            On vous attends
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 max-w-md">
                            <input
                                type="email"
                                className=" rounded-lg flex-1 appearance-none border border-gray-500 w-full py-2 px-4 bg-gray-800 text-gray-300 placeholder-gray-300 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-[#3651BF] focus:border-transparent"
                                placeholder="Email"
                            />
                            <button
                                className="px-4 py-2 text-base fonts-semibold text-white bg-[#3651BF] rounded-lg shadow-md hover:bg-[#32439B] focus:outline-none focus:ring-2 focus:ring-[#547FDD] focus:ring-offset-2 focus:ring-offset-[#C7D9F6]"
                                type="submit"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-center sm:justify-end max-w-xs w-full">
                        <img
                            src={newsLatterImage}
                            alt="Car "
                            className="rounded-md object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
