"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { postService } from "../../services/post"
import PostCard from "../../components/PostCard"
import LoadingSpinner from "../../components/LoadingSpinner"
import ErrorMessage from "../../components/ErrorMessage"

const AllPosts = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const { isAuthenticated } = useAuth()

  const fetchPosts = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true)
      } else {
        setLoading(true)
      }
      setError(null)

      const response = await postService.getAllPosts()
      setPosts(response.posts || response || [])
    } catch (err) {
      setError(err)
      console.error("Failed to fetch posts:", err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }