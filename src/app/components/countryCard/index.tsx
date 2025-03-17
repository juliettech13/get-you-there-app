import Image from 'next/image';
import { CountryCardProps } from '@/app/types/countryCards';
import { getISOCode } from '@/app/data/countriesToISO';
import { STRINGS } from '@/app/strings';

export function CountryCard({
  country,
  likelihood,
  position,
}: CountryCardProps) {
  const countryIso = getISOCode(country);

  return (
    <div
      className="absolute z-50 bg-white rounded-lg shadow-lg p-4 w-64"
      style={{
        left: `${position.x + 10}px`,
        top: `${position.y - 20}px`,
      }}
    >
      <div className="flex items-center gap-4">
        {countryIso && (
          <Image
            src={`https://flagcdn.com/w20/${countryIso.toLowerCase()}.png`}
            alt={`${country} flag`}
            width={48}
            height={32}
            className="object-cover rounded"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
        <div>
          <h3 className="font-semibold text-gray-800">{country}</h3>
          {likelihood !== undefined && (
            <p className="text-sm text-gray-600">{STRINGS.likelihood}: {likelihood}%</p>
          )}
        </div>
      </div>
    </div>
  );
}
