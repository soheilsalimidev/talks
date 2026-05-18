---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
glowSeed: 4
title: ISI Fianl Project
remoteAssets: false
fonts:
  sans: Inter
  serif: Robot Slab
  mono: Fira Code
layout: intro
---


<h1 flex="~ col">
<div text-2xl origin-top-left transition duration-500 :class="$clicks <= 2 ? 'scale-150' : 'op50'">
  <span v-click> isi final project </span>
</div>
<div mt1 forward:delay-300 v-click>social inequity</div>
</h1>

<div abs-br mx-10 mb-10 flex="~ col gap-4 items-end" text-left v-click="1">
  <div text-sm opacity-75 mt--4>feb. 18th 2026 - soheil salimi</div>
</div>

---
---
# Data Provenance and Structure

<div flex flex-col gap3 h-full >
 <div v-click= "1 " bg-blue:10 border= "~ gray/50 rounded-lg ">
   <div flex= "~ items-center gap-2 " bg-blue:10 px4 py2 rounded > <div  i-solar:database-broken text-xl invert-100 text-blue-4 /> Dataset Overview </div>

   <div ml2 p2 text-gray1 >
   <v-clicks :at= "2 " >

   <b>ISSP 2019 – Social Inequality V</b> (ZA7600)<br>
   <b>Source:</b> GESIS – Leibniz Institute for the Social Sciences<br>
   <b>DOI:</b> 10.4232/1.14009<br>
   <b>Topic:</b> Public attitudes toward social inequality and income distribution
   </v-clicks>
   </div>
 </div>

 <div v-click= "3 " bg-gray:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-gray:10 px4 py2 rounded > <div  i-solar:users-group-rounded-broken text-xl invert-100 text-blue-4 /> Structure & Sampling </div >

   <div ml2 p2 text-gray1 >
   <b>44,975 individuals</b> across <b>29 countries</b> (US, Japan, etc.)<br>
   <b>Method:</b> Stratified random sampling<br>
   <b>Weights:</b> Included for population generalizability
   </div >
 </div >
 </div>

---

# Key Variables

<div flex= "~ gap-4 " py6 >
 <span v-click >
   <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >Response Variables </div > <br >
   <span text-blue2 >
     <tt>v41</tt>: Self-rated social class (1--10)<br>
     <tt>v23</tt>: Govt support for unemployed (Likert 1--5)<br>
   </span >
 </span >
 <span v-click >
   <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >Predictors </div > <br >
   <span text-rose2 >
     <tt>SEX</tt>: Gender (Binary)<br>
     <tt>DEGREE</tt>: Education (Ordinal)<br>
     <tt>country</tt>: Respondent Country (Categorical)<br>
     <tt>Income</tt>: Country-specific (US_RINC, DE_INC)
   </span >
 </span >
 <span v-click >
   <div flex= "~ inline " text-yellow mr2 px2 rounded bg-yellow:10 >Variable Types </div > <br >
   <span text-yellow2 >
     Mix of <b>Categorical</b>, <b>Ordinal</b> <br>
     Sampling weights allow valid population inference
   </span >
 </span >
 </div>

---
---

# Visualization: Perceived Importance

<div flex flex-col gap3 h-full >
 <div v-click= "1 " bg-blue:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-blue:10 px4 py2 rounded > <div  i-solar:chart-bar-broken text-xl invert-100 text-blue-4 /> Factor Importance Distribution </div >

   <div ml2 p2 text-gray1 >
     <div grid grid-cols-4 gap-2 mt-2 >
       <img src= "/01_subplot_v1_Wealthy_Family.png " class= "w-full h-29 object-contain " >
       <img src= "/01_subplot_v2_Well-Educated_Parents.png " class= "w-full h-29 object-contain " >
       <img src= "/01_subplot_v3_Good_Education.png " class= "w-full h-29 object-contain " >
       <img src= "/01_subplot_v4_Hard_Work.png " class= "w-full h-29 object-contain " >
       <img src= "/01_subplot_v5_Knowing_the_Right_People.png " class= "w-full h-29 object-contain " >
       <img src= "/01_subplot_v6_Political_Connections.png " class= "w-full h-29 object-contain " >
       <img src= "/01_subplot_v7_Giving_Bribes.png " class= "w-full h-29 object-contain " >
       <img src= "/01_subplot_v8_Race.png " class= "w-full h-29 object-contain " >
       <img src= "/01_subplot_v9_Religion.png " class= "w-full h-29 object-contain " >
       <img src= "/01_subplot_v10_Gender_(Born_Male_Female).png " class= "w-full h-29 object-contain " >
     </div >
   </div >
 </div >
 </div >

---

<div flex flex-col gap3 h-full >
 <div v-click= "1" bg-gray:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-gray:10 px4 py2 rounded > <div  i-solar:clipboard-broken text-xl invert-100 text-blue-4 /> Key Results </div >

   <div ml2 p2 text-gray1 >
   <div flex= "~ col gap-4 " py2 >
     <span v-click >
       <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >Education & Work </div >
       <span text-blue2 > Consistently viewed as very important (Fig 3, 4) </span >
     </span >
     <span v-click >
       <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >Connections </div >
       <span text-rose2 > Social/Political connections considered essential (Fig 5, 6) </span >
     </span >
     <span v-click >
       <div flex= "~ inline " text-yellow mr2 px2 rounded bg-yellow:10 >Controversial </div >
       <span text-yellow2 > "Giving Bribes" shows exponential distribution (Fig 7) </span >
     </span >
     <span v-click >
       <div flex= "~ inline " text-green mr2 px2 rounded bg-green:10 >Demographics </div >
       <span text-green2 > Race/Gender considered less important overall (Fig 8, 9, 10) </span >
     </span >
   </div >
   </div >
 </div >
 </div>

---

# Income Perception & Pay Determinants

<div flex flex-col gap3 h-full >
 <div v-click= "1 " bg-blue:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-blue:10 px4 py2 rounded > <div  i-solar:money-broken text-xl invert-100 text-blue-4 /> Actual vs Ideal Income </div >

   <div ml2 p2 text-gray1 flex= "~ col md:row gap-4 " >
     <img src= "/02_actual_vs_ideal_pay.png " class= "w-full  h-48 object-contain " >
     <div flex= "~ col gap-2 " >
       <span v-click >
         <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >Doctors/Ministers </div >
         <span text-blue2 > Balanced perceptions around fairness line </span >
       </span >
       <span v-click >
         <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >CEOs </div >
         <span text-rose2 > Points below line: Should earn less </span >
       </span >
       <span v-click >
         <div flex= "~ inline " text-green mr2 px2 rounded bg-green:10 >Workers </div >
         <span text-green2 > Points above line: Should earn more (Shop/Factory) </span >
       </span >
     </div >
   </div >
 </div >
 </div >

---

# What Should Determine Pay?
<div flex flex-col gap3 h-full >
 <div bg-gray:10 border= "~ gray/50 rounded-lg " >
   <div ml2 p2 text-gray1 flex= "~ col md:row gap-4 " >
     <img src= "/03_pay_determinants.png " class= "w-full md:w-1/2 h-48 object-contain " >
     <div flex= "~ col gap-2 " >
       <span v-click >
         <div flex= "~ inline " text-yellow mr2 px2 rounded bg-yellow:10 >Top Factor </div >
         <span text-yellow2 > "Having Children to Support" (Avg ≈ 4.1) </span >
       </span >
       <span v-click >
         <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >Performance </div >
         <span text-blue2 > "Individual Performance" (Avg ≈ 3.6) </span >
       </span >
       <span v-click >
         <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >Responsibility </div >
         <span text-rose2 > "Level of Responsibility" (Avg ≈ 3.1) </span >
       </span >
     </div >
   </div >
 </div>
 </div>

---

# Social Placement & Gender

<div flex flex-col gap3 h-full >
 <div v-click= "1 " bg-blue:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-blue:10 px4 py2 rounded > <div  i-solar:users-group-broken text-xl invert-100 text-blue-4 /> Self-Placement on Social Ladder </div >

   <div ml2 p2 text-gray1 >
     <div flex= "~ row gap-4 " >
       <div flex= "~ col " >
         <img src= "/06_social_position_by_parental_education.png" class= "w-full h-48 object-contain " >
         <div text-center text-sm mt-1 > By Parental Education </div >
       </div >
       <div flex= "~ col " >
         <img src= "/05_social_position_by_gender.png" class= "w-full h-48 object-contain " >
         <div text-center text-sm mt-1 > By Gender </div >
       </div >
     </div >
   </div >
 </div >


 <div  bg-gray:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-gray:10 px4 py2 rounded > <div  i-solar:chart-broken text-xl invert-100 text-blue-4 /> Key Findings </div >

   <div ml2 p2 text-gray1 >
   <div flex= "~ row gap-4 " py2 >
     <span v-click >
       <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >Privilege Proxy </div >
       <span text-blue2 > Less Privileged median ≈ 5 vs Privileged ≈ 6 </span >
     </span >
     <span v-click >
       <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >Gender Gap </div >
       <span text-rose2 > Males median ≈ 7, Females median ≈ 6 </span >
     </span >
     <span v-click >
       <div flex= "~ inline " text-yellow mr2 px2 rounded bg-yellow:10 >Overlap </div >
       <span text-yellow2 > Significant overlap exists despite median differences </span >
     </span >
   </div >
   </div >
 </div >
 </div>

---

# Parametric Inference: Income Distribution

<div flex  gap3 h-full >
 <div v-click= "1 " bg-blue:10 border= "~ gray/50 rounded-lg h-hit" >
   <div flex= "~ items-center gap-2 " bg-blue:10 px4 py2 rounded > <div  i-solar:graph-up-broken text-xl invert-100 text-blue-4 /> Context & Normality Check </div >

   <div ml2 p2 text-gray1 >
   <b>Focus:</b> US Personal Income (US_RINC)<br>
   <b>Reason:</b> Other variables are categorical/ordinal<br>
   <b>Tests:</b> Shapiro–Wilk (p=0.0000), Kolmogorov–Smirnov (p=0.0003)<br>
   <b>Result:</b> Normality rejected at α=0.05 (Right skewness)
   </div >
 </div >

 <div v-click= "3 " bg-gray:10 border= "~ gray/50 rounded-lg h-hit" >
   <div flex= "~ items-center gap-2 " bg-gray:10 px4 py2 rounded > <div  i-solar:chart-broken text-xl invert-100 text-blue-4 /> Distribution Visualization </div >

   <div ml2 p2 text-gray1 flex= "~ col gap-4 " >
     <img src= "/income_distribution.png " class= "w-full  object-contain " >
     <div flex= "~ col gap-2 " justify-center >
       <span v-click >
         <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >Q–Q Plot </div >
         <span text-rose2 > Upper tail shows right skewness & heavy tails </span >
       </span >
       <span v-click >
         <div flex= "~ inline " text-yellow mr2 px2 rounded bg-yellow:10 >Histogram </div >
         <span text-yellow2 > Log-scale personal income distribution </span >
       </span >
     </div >
   </div >
 </div >
 </div>

---

# Gamma Distribution Fit

<div flex  gap3 h-full >
 <div v-click= "1 " bg-blue:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-blue:10 px4 py2 rounded > <div  i-solar:calculator-broken text-xl invert-100 text-blue-4 /> MLE Parameters </div >

   <div ml2 p2 text-gray1 grid grid-cols-2 gap-4 >
     <span >
       <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >Shape (α) </div >
       <span text-blue2 > 1.2729 (< 2 confirms skew) </span >
     </span >
     <span  >
       <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >Scale (β) </div >
       <span text-blue2 > 45,054.66 </span >
     </span >
     <span  >
       <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >Mean </div >
       <span text-rose2 > $57,348 </span >
     </span >
     <span  >
       <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >Median </div >
       <span text-rose2 > $36,872 </span >
     </span >
   </div >
 </div >

 <div v-click= "2 " bg-gray:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-gray:10 px4 py2 rounded > <div  i-solar:chart-line-broken text-xl invert-100 text-blue-4 /> Fit & Diagnostics </div >

   <div ml2 p2 text-gray1 flex= "~ col  gap-4 " >
     <div flex= "~ row gap-2 " >
       <img src= "/gamma_fit.png " class= "w-1/2  object-contain " >
       <img src= "/gamma_qq.png " class= "w-2/5 object-contain " >
     </div >
     <div flex= "~ col gap-2 " justify-center >
       <span v-click >
         <div flex= "~ inline " text-green mr2 px2 rounded bg-green:10 >95% CI (Mean) </div >
         <span text-green2 > ($56,239.23, $58,458.09) </span >
       </span >
       <span v-click >
         <div flex= "~ inline " text-yellow mr2 px2 rounded bg-yellow:10 >Gamma QQ </div >
         <span text-yellow2 > Points align near y=x (Upper tail apartness) </span >
       </span >
     </div >
   </div >
 </div >
 </div>

---

# Median Estimation & Bootstrap

<div flex flex-col gap3 h-full >
 <div v-click= "1 " bg-blue:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-blue:10 px4 py2 rounded > <div  i-solar:box-broken text-xl invert-100 text-blue-4 /> Why Median? </div >

   <div ml2 p2 text-gray1 >
   <b>Reason:</b> Data is heavily right-skewed<br>
   <b>Benefit:</b> Median is more robust than mean<br>
   <b>Method:</b> Bootstrap distribution (10,000 replicates)
   </div >
 </div >

 <div v-click= "3 " bg-gray:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-gray:10 px4 py2 rounded > <div  i-solar:activity-broken text-xl invert-100 text-blue-4 /> Bootstrap Results </div >

   <div ml2 p2 text-gray1 flex= "~ row gap-4 " >
     <div flex= "~ gap-2 " >
       <img src= "/bootstrap_median_distribution.png " class= "w-full h-64 object-contain " >
       <img src= "/bootstrap_median_ci.png " class= "w-full h-64 object-contain " >
     </div >
     <div flex= "~ col gap-2 " justify-center >
       <span v-click >
         <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >Distribution </div >
         <span text-blue2 > Peaked around $45,000 </span >
       </span >
       <span v-click >
         <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >95% Bootstrap CI </div >
         <span text-rose2 >  45,000.00 </span >
       </span >
       <span v-click >
         <div flex= "~ inline " text-green mr2 px2 rounded bg-green:10 >Precision </div >
         <span text-green2 > Shows precision in median estimate under resampling </span >
       </span >
     </div >
   </div >
 </div >
 </div>

---

# Hypothesis Testing: Social Position & Redistribution

<div flex flex-col gap3 h-full >
 <div v-click= "1 " bg-blue:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-blue:10 px4 py2 rounded > <div  i-solar:scale-broken text-xl invert-100 text-blue-4 /> Hypotheses </div >

   <div ml2 p2 text-gray1 >
   <b>H₀:</b> Social position has no effect on redistribution support<br>
   <b>Hₐ:</b> At least one group differs in median social position<br>
   <b>Variables:</b> v22 (1-5 scale), TOPBOT (ordinal)<br>
   <b>Method:</b> Non-parametric testing (non-normality confirmed)
   </div >
 </div >

 <div v-click= "3 " bg-gray:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-gray:10 px4 py2 rounded > <div  i-solar:chart-bar-broken text-xl invert-100 text-blue-4 /> Kruskal–Wallis Test </div >

   <div ml2 p2 text-gray1 flex= "~ row gap-4 " >
     <img src= "/05_topbot_by_v22.png " class= "w-full md:w-1/2 h-48 object-contain " >
     <div flex= "~ col gap-2 " justify-center >
       <span v-click >
         <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >H Statistic </div >
         <span text-rose2 > H = 912.655 </span >
       </span >
       <span v-click >
         <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >p-value </div >
         <span text-blue2 > p = 3.02 × 10⁻¹⁹⁶ </span >
       </span >
       <span v-click >
         <div flex= "~ inline " text-green mr2 px2 rounded bg-green:10 >Result </div >
         <span text-green2 > Reject H₀ - Significant difference across groups </span >
       </span >
     </div >
   </div >
 </div >
 </div>

---

# Correlation & Bootstrap Analysis

<div flex flex-col gap3 h-full >
 <div v-click= "1 " bg-blue:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-blue:10 px4 py2 rounded > <div  i-solar:link-broken text-xl invert-100 text-blue-4 /> Spearman Correlation </div >

   <div ml2 p2 text-gray1 grid grid-cols-2 gap-2 >
     <span  >
       <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >Observed ρ </div >
       <span text-blue2 > 0.142 (weak positive) </span >
     </span >
     <span >
       <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >One-tailed p </div >
       <span text-rose2 > 1.000 (no evidence) </span >
     </span >
     <span  >
       <div flex= "~ inline " text-yellow mr2 px2 rounded bg-yellow:10 >Two-tailed p </div >
       <span text-yellow2 > ≈ 0.000 (significant) </span >
     </span >
     <span  >
       <div flex= "~ inline " text-green mr2 px2 rounded bg-green:10 >Power </div >
       <span text-green2 > ≈ 1.00 (n ≈ 385 needed for 80%) </span >
     </span >
   </div >
 </div >

 <div v-click= "2" bg-gray:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-gray:10 px4 py2 rounded > <div  i-solar:activity-broken text-xl invert-100 text-blue-4 /> Bootstrap Distribution </div >

   <div ml2 p2 text-gray1 flex= "~ row gap-4 " >
     <img src= "/05_bootstrap_correlation.png " class= "w-full md:w-1/2 h-48 object-contain " >
     <div flex= "~ col gap-2 " justify-center >
       <span  >
         <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >Null Distribution </div >
         <span text-blue2 > Bootstrap resampling under H₀ </span >
       </span >
       <span  >
         <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >Observed ρ </div >
         <span text-rose2 > Red dashed line at 0.142 </span >
       </span >
       <span  >
         <div flex= "~ inline " text-green mr2 px2 rounded bg-green:10 >Consistency </div >
         <span text-green2 > Matches Kruskal-Wallis findings </span >
       </span >
     </div >
   </div >
 </div >
 </div>

---

# Domestic vs Global Fairness Perceptions

<div flex flex-col gap3 h-full >
 <div v-click= "1 " bg-blue:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-blue:10 px4 py2 rounded > <div  i-solar:globe-broken text-xl invert-100 text-blue-4 /> Hypotheses (U.S. Only) </div >

   <div ml2 p2 text-gray1 >
   <b>H₀:</b> No association between domestic (v50) and global (v66) fairness<br>
   <b>H₁:</b> Domestic unfairness perception linked to global unfairness<br>
   <b>Scale:</b> 1 = Very Fair, 4 = Very Unfair (ordinal)<br>
   <b>Method:</b> Non-parametric tests appropriate
   </div >
 </div >

 <div v-click= "3 " bg-gray:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-gray:10 px4 py2 rounded > <div  i-solar:users-group-broken text-xl invert-100 text-blue-4 /> Power Analysis </div >

   <div ml2 p2 text-gray1 grid grid-cols-2 gap-2 >
     <span v-click >
       <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >Target ρ </div >
       <span text-blue2 > 0.25 </span >
     </span >
     <span v-click >
       <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >Required n </div >
       <span text-rose2 > 124 </span >
     </span >
     <span v-click >
       <div flex= "~ inline " text-yellow mr2 px2 rounded bg-yellow:10 >Actual n </div >
       <span text-yellow2 > 1,683 (U.S. sample) </span >
     </span >
     <span v-click >
       <div flex= "~ inline " text-green mr2 px2 rounded bg-green:10 >Power </div >
       <span text-green2 > >0.999 </span >
     </span >
   </div >
 </div >
 </div>

---

# Statistical Tests & Results

<div flex  gap3 h-full >
 <div v-click= "1 " bg-blue:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-blue:10 px4 py2 rounded > <div  i-solar:clipboard-list-broken text-xl invert-100 text-blue-4 /> Four Inferential Approaches </div >

   <div ml2 p2 text-gray1 >
   <div flex= "~ col gap-3 " py2 >
     <span  >
       <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >Pearson </div >
       <span text-blue2 > r = 0.323, p < 0.001 </span >
     </span >
     <span  >
       <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >Spearman </div >
       <span text-rose2 > ρ = 0.344, p < 0.001 </span >
     </span >
     <span  >
       <div flex= "~ inline " text-yellow mr2 px2 rounded bg-yellow:10 >Kruskal-Wallis </div >
       <span text-yellow2 > H = 1746.44, df = 3, p < 0.001 </span >
     </span >
     <span  >
       <div flex= "~ inline " text-green mr2 px2 rounded bg-green:10 >Bootstrap CI </div >
       <span text-green2 > 95% CI [0.329, 0.360] </span >
     </span >
   </div >
   </div >
 </div >

<div v-click="2" bg-gray:10 border="~ gray/50 rounded-lg">
  <div flex="~ items-center gap-2" bg-gray:10 px4 py2 rounded>
    <div i-solar:chart-broken text-xl invert-100 text-blue-4 /> Fairness Association
  </div>

  <div ml2 p2 text-gray1 flex="~ col  gap-4">
    <img src="/consistency_fairness_perceptions.png" class="w-2/5 object-contain">
    <div flex="~ col gap-2" justify-center>
      <span>
        <div flex="~ inline" text-blue mr2 px2 rounded bg-blue:10>Trend</div>
        <span text-blue2>Positive association: Higher U.S. unfairness ratings correlate with higher Global unfairness ratings</span>
      </span>
      <span>
        <div flex="~ inline" text-rose mr2 px2 rounded bg-rose:10>Effect Size</div>
        <span text-rose2>Spearman $ \rho \approx 0.34 $ (Moderate monotonic relationship)</span>
      </span>
      <span>
        <div flex="~ inline" text-green mr2 px2 rounded bg-green:10>Conclusion</div>
        <span text-green2>Perceptions of domestic and global inequality are significantly linked (p &lt; 0.001)</span>
      </span>
    </div>
  </div>
</div>
 </div>


---

# Regression Analysis: Model & OLS

<div flex  gap3 h-full >
 <div v-click= "1 " bg-blue:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-blue:10 px4 py2 rounded > <div  i-solar:graph-up-broken text-xl invert-100 text-blue-4 /> Model Specification </div >

   <div ml2 p2 text-gray1 >
   <b>Target:</b> v41 (Self-rated social position 1-10)<br>
   <b>Predictors:</b> Log Income, Age, Education (Dummies), Sex<br>
   <b>Method:</b> OLS with Regularization (Ridge/Lasso)<br>
   <b>Sample:</b> 1,627 observations
   </div >
 </div >

 <div v-click= "3 " bg-gray:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-gray:10 px4 py2 rounded > <div  i-solar:calculator-broken text-xl invert-100 text-blue-4 /> OLS Results </div >

   <div ml2 p2 text-gray1 >
   <div flex= "~ col gap-2 " py2 >
     <span  >
       <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >Equation </div >
       <span text-blue2 > v41 = 4.615 + 0.034*log_inc + 0.014*AGE + Edu - 0.332*Sex </span >
     </span >
     <span  >
       <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >Education </div >
       <span text-rose2 > Strongest predictor (β=1.453 for highest level) </span >
     </span >
     <span  >
       <div flex= "~ inline " text-yellow mr2 px2 rounded bg-yellow:10 >Gender </div >
       <span text-yellow2 > Females score 0.332 lower (p < 0.001) </span >
     </span >
     <span  >
       <div flex= "~ inline " text-green mr2 px2 rounded bg-green:10 >Fit </div >
       <span text-green2 > R² = 0.110, Adj R² = 0.107 </span >
     </span >
   </div >
   </div >
 </div >
 </div>

---

# Regularization & Coefficients

<div flex  gap3 h-full >
 <div v-click= "1 " bg-blue:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-blue:10 px4 py2 rounded > <div  i-solar:box-broken text-xl invert-100 text-blue-4 /> Cross-Validation </div >

   <div ml2 p2 text-gray1 grid grid-cols-2 gap-2 >
     <span  >
       <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >Method </div >
       <span text-blue2 > 5-fold CV </span >
     </span >
     <span  >
       <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >Ridge R² </div >
       <span text-rose2 > 0.098 </span >
     </span >
     <span  >
       <div flex= "~ inline " text-yellow mr2 px2 rounded bg-yellow:10 >Lasso R² </div >
       <span text-yellow2 > 0.097 </span >
     </span >
     <span  >
       <div flex= "~ inline " text-green mr2 px2 rounded bg-green:10 >Insight </div >
       <span text-green2 > Modest predictive power on new data </span >
     </span >
   </div >
 </div >

 <div v-click= "2 " bg-gray:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-gray:10 px4 py2 rounded > <div  i-solar:clipboard-list-broken text-xl invert-100 text-blue-4 /> Coefficient Comparison </div >

   <div ml2 p2 text-gray1 >
   <div flex= "~ col gap-2 " py2 >
     <span  >
       <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >Education (5.0) </div >
       <span text-blue2 > OLS: 1.453 → Ridge: 0.511 → Lasso: 0.484 </span >
     </span >
     <span  >
       <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >Sex (Female) </div >
       <span text-rose2 > OLS: -0.332 → Ridge: -0.164 → Lasso: -0.162 </span >
     </span >
     <span  >
       <div flex= "~ inline " text-yellow mr2 px2 rounded bg-yellow:10 >Age </div >
       <span text-yellow2 > Increases under regularization (0.014 → 0.242) </span >
     </span >
     <span  >
       <div flex= "~ inline " text-green mr2 px2 rounded bg-green:10 >Lasso </div >
       <span text-green2 > Retained all 7 predictors (none zeroed) </span >
     </span >
   </div >
   </div >
 </div >
 </div>

---

# Model Diagnostics

<div flex  gap3 h-full >
 <div v-click= "1 " bg-blue:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-blue:10 px4 py2 rounded > <div  i-solar:activity-broken text-xl invert-100 text-blue-4 /> Normality & Residuals </div >

   <div ml2 p2 text-gray1 flex= "~ col  gap-4 " >
     <div flex= "~ gap-2 " >
       <img src= "/qq_plot.png " class= "w-full h-32 object-contain " >
       <img src= "/residual_distribution.png " class= "w-full h-32 object-contain " >
     </div >
     <div flex= "~ col gap-2 " justify-center >
       <span  >
         <div flex= "~ inline " text-blue mr2 px2 rounded bg-blue:10 >Q-Q Plot </div >
         <span text-blue2 > Near-normal, slight left skew (Skew = -0.336) </span >
       </span >
       <span  >
         <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >Shapiro-Wilk </div >
         <span text-rose2 > W = 0.977, p < 0.001 </span >
       </span >
       <span  >
         <div flex= "~ inline " text-green mr2 px2 rounded bg-green:10 >Histogram </div >
         <span text-green2 > Symmetric, leptokurtic (Kurt = 4.02) </span >
       </span >
     </div >
   </div >
 </div >

 <div v-click= "2 " bg-gray:10 border= "~ gray/50 rounded-lg " >
   <div flex= "~ items-center gap-2 " bg-gray:10 px4 py2 rounded > <div  i-solar:chart-broken text-xl invert-100 text-blue-4 /> Heteroscedasticity </div >

   <div ml2 p2 text-gray1 flex= "~ col md:row gap-4 " >
     <img src= "/residuals_vs_fitted.png " class= "w-full h-48 object-contain " >
     <div flex= "~ col gap-2 " justify-center >
       <span  >
         <div flex= "~ inline " text-yellow mr2 px2 rounded bg-yellow:10 >Pattern </div >
         <span text-yellow2 > Variance increases as fitted value > 6 </span >
       </span >
       <span  >
         <div flex= "~ inline " text-rose mr2 px2 rounded bg-rose:10 >Breusch-Pagan </div >
         <span text-rose2 > LM = 44.65, p < 0.001 </span >
       </span >
       <span >
         <div flex= "~ inline " text-green mr2 px2 rounded bg-green:10 >Bias </div >
         <span text-green2 > No clear model bias (residuals centered) </span >
       </span >
     </div >
   </div >
 </div >
 </div>

---
src: ./../../reuse/thanks.md
---

