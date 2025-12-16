---
title: "Smart Home Dashboard"
description: "A real-time IoT dashboard for monitoring and controlling smart home devices. Built with ESP32 sensors, MQTT protocol, and a React frontend."
thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format&q=80"
category: "iot"
technologies: ["ESP32", "MQTT", "React", "Node.js", "InfluxDB", "Grafana"]
liveUrl: "https://smarthome.muhamadaliridho.me"
sourceUrl: "https://github.com/muhamadaliridho/smart-home-dashboard"
featured: true
publishedAt: 2024-06-15T00:00:00Z
gallery:
  [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop&auto=format&q=80",
  ]
---

## Overview

A comprehensive smart home monitoring system that connects various IoT sensors throughout the house to a centralized dashboard.

## Features

- Real-time temperature and humidity monitoring
- Motion detection alerts
- Light control automation
- Energy consumption tracking
- Mobile-responsive dashboard

## Technical Details

The system uses ESP32 microcontrollers with various sensors (DHT22, PIR, LDR) communicating via MQTT to a Node.js backend. Data is stored in InfluxDB for time-series analysis and visualized using a custom React dashboard.
