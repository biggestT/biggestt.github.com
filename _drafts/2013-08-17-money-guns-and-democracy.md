---
layout: post
title: "Money, guns and democracy"
tagline: "Exloring dirty correlations with visualization tools"
category: text
cover: democracies1970.png
tags: []
---

Background
----------
Democracy is a form of governance that most democratic countries wants other countries to have. Democracy as a political system will not be evaluated in this report but is assumed to be a measure of freedom. But how does one turn a non-democratic country into a democracy? Are we moving towards a more democratic world? Are democratic countries more peaceful than other countries? These are questions that will be addressed throughout this report which uses information visualization as a mean to find answers in this matter. 

Hypothesis
----------
In Minxin Pei's \cite{web:pei} article it is stated that there exists somewhat of a threshold measured in GDP per capita where many states transforms from dictatorships into democracies. This threshold is said to be somewhere around 10 000 GDP per capita after adjustments for purchasing power parity has been made. In this article we want to see if this statement can be said to be true as well as explore if there are any correlations in a countries arms trade and the degree of democracy in its governance. 

Data
-----
The data used in this report contains the indicators found in Table \ref{tbl:indicators} given for different countries over time given in years. The dollar values used have been adjusted for inflation to match the US dollar value of 1990. 

<!-- \begin{table}[H]
    \caption{Indicators used}
    \vspace{0.5cm}
    \label{tbl:indicators}
    \centering
    \begin{tabular}{l*{6}{c}r}
    
        Indicator              & Unit  & Source\\
        \hline
        \\
        Polity IV & index &  Center for Systematic Peace \cite{pdf:polity4} \\
        GDP/capita (PPP) & Dollars & The World Bank \\
        Arms Exports & Dollars  & The World Bank \\
        Arms Imports & Dollars  & The World Bank \\
    \end{tabular}
\end{table} -->

The Datasets
############
Data sets from two different sources were used to provide data for the visualizations in the report.
\subsubsection{Polity IV index}
Democracy is not trivially measurable and in order to investigate its correlation with other variables we need to find a way to measure it numerically. The Polity IV index \cite{pdf:polity4} is designed to tell us how democratic a country is by weighing different parameters and outputting one single index between -10 and 10. To get a feel for what these number represents it can be noted that Sweden has a Polity IV index of 10 and China has an index of -7. A data set in Excel format containing the Polity IV index indicator for different countries over time was retrieved from the Center for Systematic Peace \cite{pdf:polity4}. A dozen of countries, for example North Korea, currently don't have a Polity IV index assigned to them and most non-European countries don't get assigned their first Polity IV index until around the 1970's. 

The World Bank
#############
The GDP, arms export and arms import indicators were retrieved from data sets published by the World Bank.
The GDP data from The World Bank only have records back to 1980 and therefore no further analysis back in time could be made.\cite{web:wbgdp}

Formatting
##########
The dataset for the Polity IV index had to first be manually manipulated in Excel in order to assign each entry an appropriate country code according to the ISO 3166-1 standard. The resulting Excel file was then converted into the unicode format using NComVA's Data Wizard. The data from the World Bank was simpler to get in unicode format since it was already an integrated part of the Data Wizard. After all of the data sets had been converted into unicode format they were ready to be used in NComVA's World EXplorer.

Visualization Methods
----------------------
Different visualization methods were applied in order to see what different patterns could be hidden within the data. NComVA's online Flash applications MDimExplorer and World Statistics Explorer were used to apply these methods to the data set.

The Polity IV Indicator as a Color
################################
A gradient color map ranging between dark red and dark blue was chosen to indicate a country's Polity IV index. Darker blue color for countries being closer to 10 on the index scale and darker red for those closer to -10. The threshold between blue and red shades is set to 0. The conception that a "red" country is less democratic is grounded in history where one party states like the Soviet Union and China have had red as the prime color of their flags. This use of intuitive colors allows for the process of interpreting a visualisation to become pre-attentive. 

Scatter Plot 
###########
One of the most well known visualization methods is the scatter plot. In this project it was used to detect the
correlation between Polity IV index and GDP. The scatter plot is not optimal for multidimensional data, but since a pretty small number of variables were used in this project scatter plot became a useful method. The scatter plot has been used with tail-lines  showing how certain countries have moved in the plot over time. In figures \ref{fig:scatterplotDem} and \ref{fig:scatterplotNoDem} the results of this can be seen in scatter plots where the horizontal axis indicates Polity IV index and the vertical axis indicates GDP per capita. 

![Countries that have gotten a higher Polity IV index as they have been getting richer. The countries are Mexico (purple),  Brazil (blue), Turkey (turquoise), Argentina (green) and Chile (brown). ]({{ BASE_PATH }}/assets/images/democracies1.png)
 