---
title: "model_5_age_prob"
author: "XIANGYU ZHANG"
date: "July 26, 2018"
output: word_document
---

```{r setup, include=FALSE}
knitr::opts_chunk$set(echo = TRUE)
library(rpart)
library(caret)
```

```{r}
prob$age_label = as.factor(prob$age_label)
head(prob)
```

```{r}
# Run algorithms using 10-fold cross validation
control <- trainControl(method="cv", number=10)
metric <- "Accuracy"
```

```{r}
# 70% and 30%, best model: RF, Accuracy with Validation: 75%
# 80% and 20%, best model: RF, Accuracy wiht validation: 68%
# 60% and 20%, best model: RF, Accuracy with validation: 81%
```



```{r}
# use 80% of data to training and testing the models
# and use the remaining 20% as validation dataset
set.seed(1)
n = nrow(prob)
train = sample(1:n, n*0.6)
test = (-train)
dataset = prob[train, ]
validation = prob[test, ]

```


```{r}
# a) linear algorithms
set.seed(1)
fit.lda <- train(age_label~., data=dataset, method="lda", metric=metric, trControl=control)
# b) nonlinear algorithms
# CART
set.seed(1)
fit.cart <- train(age_label~., data=dataset, method="rpart", metric=metric, trControl=control)
# kNN
set.seed(1)
fit.knn <- train(age_label~., data=dataset, method="knn", metric=metric, trControl=control)
# c) advanced algorithms
# SVM
set.seed(1)
fit.svm <- train(age_label~., data=dataset, method="svmRadial", metric=metric, trControl=control)
# Random Forest
set.seed(1)
fit.rf <- train(age_label~., data=dataset, method="rf", metric=metric, trControl=control)
```

```{r}
# summarize accuracy of models
results <- resamples(list(lda=fit.lda, knn=fit.knn, svm=fit.svm, rf=fit.rf))
summary(results)
```

```{r}
dotplot(results) # Random Forest has the highest accuracy
```

```{r}
print(fit.rf)
```

```{r}
predictions <- predict(fit.rf, validation)
confusionMatrix(predictions, validation$age_label)
```



