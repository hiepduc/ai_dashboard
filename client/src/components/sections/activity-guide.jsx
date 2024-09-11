import React from "react";
import tableConfig from "../../Configuration/recommendations.json";

function ActivityGuide() {
  return (
    <div className="activity-guide">
      <table>
        <thead>
          <tr>
            <th rowSpan={2}>Air quality category</th>
            <th>General health advice and recommended actions</th>
            <th></th>
          </tr>
          <tr>
            <th>
              Sensitive groups including:
              {"\n"}
              people with a heart or lung condition, including asthma
              {"\n"}
              people over the age of 65
              {"\n"}
              infants and children
              {"\n"}
              pregnant women
            </th>
            <th>Everyone else</th>
          </tr>
        </thead>
        <tbody>
          {tableConfig.categories.map((category, index) => (
            <tr key={index}>
              <td className={`${category.commonClass} ${category.class}`}>
                <strong>{category.name}</strong>
              </td>
              <td>
                <ul>
                  {category.sensitiveGroups.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {category.everyoneElse.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActivityGuide;
