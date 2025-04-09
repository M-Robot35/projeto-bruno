import { frontConstants } from "@/app/core/constants/front-constants"


export default function Page(){
    const paths= frontConstants.integracoes_path
    return (
        <section>
            {
                paths.map((path, index)=>{
                    return <a target="_blank" key={index} href={path.url}>
                        <div>{path.name}</div>
                    </a>
                })
            }

        </section>
    )
}