import Image from 'next/image'
import closeIcon from '../../assets/img/icons/close.svg'
import { RewievCasinoDataResponse } from '../../types'

interface TextWithDynamicHeadingsProps {
    text: string
}

const TextWithDynamicHeadings: React.FC<TextWithDynamicHeadingsProps> = ({ text }) => {
    // Разделяем текст по двойным переносам строк
    const sections = text.split(/\r\n\r\n/)

    // Проверяем, можно ли считать строку заголовком
    const isHeading = (line: string): boolean => {
        const wordCount = line.trim().split(/\s+/).length
        return wordCount > 0 && wordCount <= 5
    }

    return (
        <div className="main-popup__text">
            {sections.map((section, index) => {
                const trimmedSection = section.trim()
                if (isHeading(trimmedSection)) {
                    return (
                        <h2 key={index} className="main-popup__title">
                            {trimmedSection}
                        </h2>
                    )
                }
                return (
                    <p key={index} style={{ marginBottom: '0.5rem' }}>
                        {trimmedSection}
                    </p>
                )
            })}
        </div>
    )
}

interface PopupReadMoreProps {
    openModal: boolean
    handlerOpen: (s: boolean) => void
    data: RewievCasinoDataResponse | undefined
}

export const PopupReadMore: React.FC<PopupReadMoreProps> = ({ openModal, handlerOpen, data }) => {
    return (
        <div className={`popup popup-review ${openModal ? 'open' : ''}`}>
            <div className="popup__body">
                <div className="popup__content">
                    <div className="popup__top top-popup">
                        <h3 className="top-popup__title">{data?.name} review</h3>
                        <button className="top-popup__close popup-close" onClick={() => handlerOpen(false)}>
                            <Image src="/img/icons/close.svg" alt="close" width={13} height={13} />
                        </button>
                    </div>
                    <div className="popup__main main-popup">
                        <div className="main-popup__text-block">
                            {/* <div className="main-popup__title">General info</div> */}
                            <TextWithDynamicHeadings text={data?.review || ''} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
