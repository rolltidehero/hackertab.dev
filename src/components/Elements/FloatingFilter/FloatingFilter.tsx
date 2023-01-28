import { SupportedCard, GLOBAL_TAG, MY_LANGUAGES_TAG, dateRanges } from 'src/config'
import { FiFilter } from 'react-icons/fi'
import { useState } from 'react'
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { useUserPreferences } from 'src/stores/preferences'
import { trackCardLanguageSelect, trackCardDateRangeSelect } from 'src/lib/analytics'
import { ChipsSet } from 'src/components/Elements'

type ListingFilterMobileProps = {
  card: SupportedCard
  filters?: ('datesRange' | 'language')[]
}

export const FloatingFilter = ({ card, filters = ['language'] }: ListingFilterMobileProps) => {
  const [open, setOpen] = useState(false)
  const { userSelectedTags, cardsSettings, setCardSettings } = useUserPreferences()
  const [availableTagOptions] = useState(
    [GLOBAL_TAG, ...userSelectedTags, MY_LANGUAGES_TAG].map((tag) => ({
      label: tag.label,
      value: tag.value,
    }))
  )
  return (
    <>
      <button
        className="floatingFilter"
        onClick={() => setOpen(true)}
        style={open ? { display: 'none' } : {}}>
        <FiFilter className="floatingFilterIcon" />
      </button>

      <BottomSheet
        defaultSnap={({ maxHeight }) => maxHeight / 2}
        open={open}
        expandOnContentDrag={true}
        onDismiss={() => setOpen(false)}>
        <div style={{ padding: '16px' }}>
          <div className="settings floatingFilterBottomSheet">
            <h1 className="title">Customize {card.label}</h1>

            {filters.includes('language') && (
              <div className="settingRow">
                <p className="settingTitle">Language</p>
                <div className="settingContent">
                  <ChipsSet
                    defaultValues={
                      availableTagOptions
                        .filter((tag) => tag.value === cardsSettings[card.value]?.language)
                        ?.map((tag) => tag.label) || [GLOBAL_TAG.value]
                    }
                    options={availableTagOptions}
                    onChange={(_, option) => {
                      setCardSettings(card.value, {
                        ...cardsSettings[card.value],
                        language: option.value,
                      })
                      trackCardLanguageSelect(card.analyticsTag, option.value)
                    }}
                  />
                </div>
              </div>
            )}

            {filters.includes('datesRange') && (
              <div className="settingRow">
                <p className="settingTitle">Date Range</p>
                <div className="settingContent">
                  <ChipsSet
                    defaultValues={
                      dateRanges
                        .filter((date) => date.value === cardsSettings[card.value]?.dateRange)
                        .map((date) => date.value) || dateRanges[0].value
                    }
                    options={dateRanges}
                    onChange={(_, option) => {
                      setCardSettings(card.value, {
                        ...cardsSettings[card.value],
                        dateRange: option.value,
                      })
                      trackCardDateRangeSelect(card.analyticsTag, option.value)
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </BottomSheet>
    </>
  )
}
