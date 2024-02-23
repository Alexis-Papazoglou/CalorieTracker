import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import DayMealsContainer from "../ReusableComponents/DayMealsContainer";
import { colors } from "../../constants/colors";
import { getDate } from "../../utils";
import { hardShadow, primaryShadow, secondaryShadow } from "../../constants/shadows";

const DatesCalendar = () => {
  const currentDate = getDate("today");
  const [selectedDate, setSelectedDate] = useState<string | null>(currentDate);

  const handleDayPress = (date: { dateString: string }) => {
    setSelectedDate(date.dateString);
  };

  return (
    <ScrollView>
      <Calendar
        current={currentDate}
        style={{
          borderColor: "gray",
          gap: 10,
        }}
        dayComponent={({ date, state }) => {
          const isSelectedDate = date?.dateString === selectedDate;
          const isCurrentDate = date?.dateString === currentDate;
          return (
            <TouchableOpacity
              style={{
                ...styles.date,
                backgroundColor: isSelectedDate ? colors.darkerTertiary : isCurrentDate ? colors.tertiary : "white",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => handleDayPress(date as any)}
            >
              <View>
                <Text
                  style={{
                    color: state === "disabled" ? "lightgray" : "black",
                  }}
                >
                  {date?.day}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {selectedDate && <DayMealsContainer date={selectedDate} appearedMealsNumber={undefined} />}
    </ScrollView>
  );
};

const styles = {
  date: {
    width: 40,
    height: 40,
    borderColor: "lightgray",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    ...secondaryShadow,
  },
};

export default DatesCalendar;
