import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import WlbText from './WlbText';
import { useTheme } from 'context/theme';
import WlbIcon from 'components/WlbIcon';

interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date;
  isHighlighted?: (date: Date) => boolean;
}

export default function Calendar({
  onDateSelect,
  selectedDate,
  isHighlighted,
}: CalendarProps) {
  const theme = useTheme();
  const [currentMonth, setCurrentMonth] = useState(selectedDate ?? new Date());

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  );
  const lastDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  );

  const firstDayOfWeek = firstDayOfMonth.getDay();
  const adjustedFirstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const daysInMonth = lastDayOfMonth.getDate();
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - adjustedFirstDayOfWeek);

  const totalDays = adjustedFirstDayOfWeek + daysInMonth;
  const weeksNeeded = Math.ceil(totalDays / 7);

  const navigateMonth = (direction: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  return (
    <View
      style={{
        borderRadius: 12,
        borderWidth: 1,
        padding: 12,
        gap: 12,
        borderColor: theme.subAlt,
        backgroundColor: theme.bg,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={() => navigateMonth(-1)}>
          <WlbIcon name="chevron-left" size={24} />
        </TouchableOpacity>
        <WlbText fontWeight="bold">{formatMonthYear(currentMonth)}</WlbText>
        <TouchableOpacity onPress={() => navigateMonth(1)}>
          <WlbIcon name="chevron-right" size={24} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}
      >
        {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day) => (
          <View
            key={day}
            style={{
              flex: 1,
              alignItems: 'center',
            }}
          >
            <WlbText color="sub">{day}</WlbText>
          </View>
        ))}
      </View>
      {Array.from({ length: weeksNeeded }, (_, weekIndex) => weekIndex).map(
        (week) => (
          <View
            key={week}
            style={{
              flexDirection: 'row',
            }}
          >
            {Array.from({ length: 7 }, (_, dayIndex) => dayIndex).map(
              (dayOfWeek) => {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + dayOfWeek + week * 7);

                const dayNumber = date.getDate();
                const isTodayDate = isToday(date);
                const isSelectedDate = isSelected(date);
                const hasHighlightOnDate = isHighlighted?.(date) ?? false;

                return (
                  <TouchableOpacity
                    key={dayOfWeek + '-' + week}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                    onPress={() => onDateSelect?.(date)}
                  >
                    <View
                      style={{
                        width: 24,
                        height: 24,
                        position: 'absolute',
                        borderRadius: '100%',
                        backgroundColor: isSelectedDate
                          ? theme.main
                          : hasHighlightOnDate
                          ? theme.subAlt
                          : 'transparent',
                      }}
                    />
                    <WlbText
                      color={isSelectedDate ? 'bg' : 'text'}
                      fontWeight={isTodayDate ? 'bold' : 'normal'}
                    >
                      {dayNumber}
                    </WlbText>
                  </TouchableOpacity>
                );
              },
            )}
          </View>
        ),
      )}
    </View>
  );
}
