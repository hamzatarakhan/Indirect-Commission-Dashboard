# 📊 Performance Overview - Dynamic Filtering Implementation

## 🎯 Business Requirement

The Performance Overview section must dynamically filter based on GlobalFilters segment and vertical selections.

---

## 📐 Data Structure

### Level 1: Company-Wide (All Segments)
```javascript
{
  year: { revenue: 84M, target: 98M, achievement: 89.4% },
  quarters: [Q1: 22.1M/25M, Q2: 20.3M/28M, Q3: 24.9M/25.8M, Q4: 16.7M/30M],
  monthly: [10 months of data]
}
```

### Level 2: Segment-Level
**Large Business:**
```javascript
{
  year: { revenue: 27M, target: 30M, achievement: 94.8% },
  quarters: [Q1: 6.5M/7.5M, Q2: 6.8M/7M, Q3: 7.2M/7.8M, Q4: 6.5M/7.7M],
  monthly: [10 months of data]
}
```

**BMB:**
```javascript
{
  year: { revenue: 35M, target: 38M, achievement: 92.1% },
  quarters: [Q1: 8.5M/9.5M, Q2: 8.8M/9.5M, Q3: 9.2M/9.5M, Q4: 8.5M/9.5M],
  monthly: [10 months of data]
}
```

**Medium Services:**
```javascript
{
  year: { revenue: 22M, target: 30M, achievement: 73.3% },
  quarters: [Q1: 7.1M/8M, Q2: 4.7M/11.5M, Q3: 8.5M/8.3M, Q4: 1.7M/12.8M],
  monthly: [10 months of data]
}
```

### Level 3: Vertical-Level
**Manufacturing & Infrastructure (within Large Business):**
```javascript
{
  year: { revenue: 8.5M, target: 9.2M, achievement: 97.2% },
  quarters: [Q1: 2.1M/2.3M, Q2: 2.2M/2.3M, Q3: 2.3M/2.4M, Q4: 1.9M/2.2M],
  monthly: [10 months of data]
}
```

**Government & Financial (within BMB):**
```javascript
{
  year: { revenue: 5.3M, target: 5.7M, achievement: 93.6% },
  quarters: [Q1: 1.3M/1.4M, Q2: 1.35M/1.4M, Q3: 1.4M/1.4M, Q4: 1.25M/1.4M],
  monthly: [10 months of data]
}
```

---

## 🔄 Filtering Logic

### Props to Add to RevenueMatrix:
```typescript
interface RevenueMatrixProps {
  // ... existing props
  selectedSegments?: string[];
  selectedVerticals?: string[];
}
```

### Filter Resolution:
```typescript
if (selectedVerticals[0] !== 'All Verticals') {
  // Show vertical-specific data
  return verticalData[selectedVerticals[0]];
}
else if (selectedSegments[0] !== 'All') {
  // Show segment-specific data
  return segmentData[selectedSegments[0]];
}
else {
  // Show company-wide data
  return segmentData['All'];
}
```

---

## 🎨 UI Updates

### Filter Label Display:
Add a dynamic label showing current filter scope:

```
All Segments → All Verticals: "Company-Wide Performance"
Large Business → All Verticals: "Large Business - All Verticals"  
Large Business → Manufacturing: "Large Business - Manufacturing & Infrastructure"
```

### Visual Indicator:
- Badge or label near "Performance Overview" title
- Color-coded to match segment/vertical selection
- Shows user what data they're viewing

---

## 📊 Example User Flows

### Flow 1: General Manager Investigating Weak Performance
1. **Start:** All Segments selected → Sees 84M / 98M = 89.4%
2. **Action:** Clicks "Medium Services" tab
3. **Result:** Performance Overview updates to 22M / 30M = 73.3% ⚠️
4. **Insight:** "Medium Services is dragging down company average!"
5. **Action:** Clicks "Healthcare" vertical
6. **Result:** Performance Overview updates to 4M / 5.5M = 72.7% ⚠️
7. **Insight:** "Healthcare vertical is the problem area"
8. **Next:** Scrolls to CustomerRevenueMatrix to see which hospitals are underperforming

### Flow 2: Vertical Manager Checking Their Performance
1. **Start:** User is Vertical Manager for "Manufacturing"
2. **Auto-filter:** Dashboard shows "Large Business → Manufacturing"
3. **Performance Overview:** Shows 8.5M / 9.2M = 97.2% ✅
4. **Insight:** "I'm exceeding target! Q3 was strongest at 95.8%"
5. **Action:** Checks monthly chart → September peaked at 770K
6. **Next:** Reviews CustomerRevenueMatrix to identify top performers

### Flow 3: Comparing Segments
1. **Action:** Clicks "Large Business" → Sees 27M (94.8%)
2. **Action:** Clicks "BMB" → Sees 35M (92.1%)
3. **Action:** Clicks "Medium Services" → Sees 22M (73.3%)
4. **Insight:** "BMB has highest revenue but Large Business has best achievement rate"
5. **Decision:** "Allocate more resources to Medium Services to improve their 73.3%"

---

## 🔢 Data Validation

### Segment Totals Must Equal Company Total:
```
Large Business: 27M
BMB: 35M
Medium Services: 22M
---
Total: 84M ✅ (matches company-wide)
```

### Vertical Totals Within Segment Must Equal Segment Total:
```
Large Business verticals:
- Manufacturing: 8.5M
- Energy: 7.2M
- Key Energy: 6.1M
- Others: 5.2M
---
Total: 27M ✅ (matches Large Business segment)
```

---

## 🚀 Implementation Steps

### Step 1: Update RevenueMatrix Props
Add `selectedSegments` and `selectedVerticals` to interface and function signature.

### Step 2: Add Data Structures
Create `segmentData` and `verticalData` objects with all revenue/target data.

### Step 3: Implement Filter Logic
Create `getCurrentData()` function that returns correct data based on filters.

### Step 4: Update PerformanceDashboard
Pass filter props to RevenueMatrix component.

### Step 5: Add Visual Indicator
Show badge/label indicating current filter scope.

### Step 6: Update Comparison Data
Ensure comparison mode works with filtered data.

---

## ✅ Success Criteria

- [ ] Clicking segment tab updates Performance Overview with segment-specific data
- [ ] Clicking vertical tab updates Performance Overview with vertical-specific data
- [ ] "All Segments" shows company-wide total (84M)
- [ ] Data totals are mathematically consistent
- [ ] Comparison mode works with filtered data
- [ ] Visual indicator shows current filter scope
- [ ] Gauges animate smoothly when data changes
- [ ] Monthly chart updates with filtered monthly data
- [ ] Quarterly cards update with filtered quarterly data

---

## 📝 Technical Notes

### Performance Considerations:
- Data structures are pre-calculated (not computed on each render)
- useMemo for expensive computations
- Smooth transitions when switching filters

### Error Handling:
- Fallback to company-wide if invalid filter
- Handle missing data gracefully
- Console warnings for data inconsistencies

### Future Enhancements:
- API integration for real-time data
- Drill-down breadcrumb trail
- Export filtered data to Excel
- Save favorite filter combinations
- Animated transitions between filter states

---

This document serves as the specification for implementing dynamic filtering in the Performance Overview component.
