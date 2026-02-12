type Props = {
    closeModal: () => void
}

export default function AddTransactionModal({ closeModal }: Props) {
    return (
        <div className="fixed z-20 w-96 h-96 bg-gray-200 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            AddTransactionModal
            <button onClick={closeModal}>Close</button>
        </div>
    )
}