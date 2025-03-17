'use client';

import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { useState } from 'react';
import { CountryCard } from '../countryCard';
import { CountryCardProps } from '@/app/types/countryCards';
import { CountryVisaResult, EligibilityMapProps } from '@/app/types/eligibility';
import { getStandardCountryName } from '@/app/data/countriesToISO';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const colorScale = scaleLinear<string>()
  .domain([0, 49, 50, 70, 71, 100])
  .range([
    'var(--color-burgundy-light)',
    'var(--color-burgundy-light)',
    'var(--color-gold)',
    'var(--color-gold)',
    'var(--color-forest-light)',
    'var(--color-forest-light)'
  ]);

export default function EligibilityMap ({ eligibilityResult, onCountrySelect }: EligibilityMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<CountryCardProps | null>(null);

  function getCountryColor(score: number | undefined): string {
    if (score === undefined) return "#e5e5e5";
    return colorScale(score);
  }

  return (
    <div className="w-full mb-8 relative" data-testid="eligibility-map">
      <ComposableMap projection="geoMercator">
        <ZoomableGroup
          center={[0, 30]}
          zoom={1}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const allVisas = eligibilityResult ? [eligibilityResult.canada_analysis, ...eligibilityResult.other_countries] as CountryVisaResult[] : [];

                const country = allVisas.find(
                  (result: CountryVisaResult) =>
                    getStandardCountryName(result?.country) === getStandardCountryName(geo.properties.name)
                );
                const score = country?.likelihood;
                const isActive = score !== undefined;
                const fillColor = getCountryColor(score);

                return (
                  <Geography
                    data-testid={`geography-${geo.properties.name}`}
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fillColor}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: {
                        fill: fillColor,
                        outline: 'none'
                      },
                      hover: {
                        fill: fillColor,
                        outline: 'none',
                        opacity: 0.8,
                        cursor: isActive ? 'pointer' : 'default'
                      },
                      pressed: {
                        fill: fillColor,
                        outline: 'none',
                        opacity: 0.7
                      }
                    }}
                    onClick={() => {
                      if (isActive && onCountrySelect) {
                        onCountrySelect(geo.properties.name);
                      }
                    }}
                    onMouseEnter={(evt) => {
                      setHoveredCountry({
                        country: geo.properties.name,
                        likelihood: score,
                        position: { x: evt.clientX, y: evt.clientY }
                      });
                    }}
                    onMouseLeave={() => setHoveredCountry(null)}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {hoveredCountry && <CountryCard
        country={hoveredCountry.country}
        likelihood={hoveredCountry.likelihood}
        position={hoveredCountry.position}
      />}
    </div>
  );
}
