---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
description: "Concise 1-2 sentence summary (50-160 characters) used in previews, RSS, and meta description."
translationKey: "{{ .File.ContentBaseName }}"
tags: []
draft: true
---
