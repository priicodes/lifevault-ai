import QRCode from "react-qr-code";

export default function EmergencyQR({ cardId }) {
  const emergencyUrl =
    `http://localhost:5173/emergency/${cardId}`;

  return (
    <div className="flex flex-col items-center mt-6">
      <h3 className="text-lg font-semibold mb-3">
        Emergency QR Code
      </h3>

      <div className="bg-white p-4 rounded-lg">
        <QRCode
          value={emergencyUrl}
          size={180}
        />
      </div>

      <p className="text-sm text-gray-500 mt-3">
        Scan to view emergency profile
      </p>
    </div>
  );
}