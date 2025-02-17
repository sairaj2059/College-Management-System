// import React, { useState } from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format } from "date-fns";

// const Calendar= () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   return (
//     <div className="p-4 rounded-lg shadow-lg bg-white w-80">
//       <div className="flex justify-between items-center mb-2">
//         <h2 className="text-lg font-semibold">Schedules</h2>
//         <button className="text-blue-600 text-sm">+ Add New</button>
//       </div>

//       <div className="text-center">
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date) => setSelectedDate(date)}
//           inline
//           calendarClassName="custom-calendar"
//           renderCustomHeader={({
//             date,
//             decreaseMonth,
//             increaseMonth,
//           }) => (
//             <div className="flex justify-between px-4 py-2">
//               <button onClick={decreaseMonth}>{"<"}</button>
//               <span className="font-semibold">
//                 {format(date, "MMMM yyyy")}
//               </span>
//               <button onClick={increaseMonth}>{">"}</button>
//             </div>
//           )}
//         />
//       </div>

//       <div className="mt-2 text-sm text-gray-500 text-center">
//         Upcoming Events
//       </div>
//     </div>
//   );
// };

// export default Calendar;
import React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Calendar, Col, Radio, Row, Select, theme, Typography } from 'antd';
import dayLocaleData from 'dayjs/plugin/localeData';
dayjs.extend(dayLocaleData);
const Calendars = () => {
  const { token } = theme.useToken();
  const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <div style={wrapperStyle}>
      <Calendar
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];
          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
          }
          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>,
            );
          }
          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>,
            );
          }
          return (
            <div
              style={{
                padding: 8,
              }}
            >
              <Typography.Title level={4}>Custom header</Typography.Title>
              <Row gutter={8}>
                <Col>
                  <Radio.Group
                    size="small"
                    onChange={(e) => onTypeChange(e.target.value)}
                    value={type}
                  >
                    <Radio.Button value="month">Month</Radio.Button>
                    <Radio.Button value="year">Year</Radio.Button>
                  </Radio.Group>
                </Col>
                <Col>
                  <Select
                    size="small"
                    popupMatchSelectWidth={false}
                    className="my-year-select"
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                  >
                    {options}
                  </Select>
                </Col>
                <Col>
                  <Select
                    size="small"
                    popupMatchSelectWidth={false}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
              </Row>
            </div>
          );
        }}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};
export default Calendars;