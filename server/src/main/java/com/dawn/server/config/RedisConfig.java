package com.dawn.server.config;

import java.time.Duration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.cache.RedisCacheWriter;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

@Configuration
public class RedisConfig {

    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory connectionFactory) {
	ObjectMapper objectMapper = new ObjectMapper();
	objectMapper.activateDefaultTyping(objectMapper.getPolymorphicTypeValidator(), ObjectMapper.DefaultTyping.NON_FINAL);
	
	Jackson2JsonRedisSerializer<Object> serializer = new Jackson2JsonRedisSerializer<>(Object.class);
	serializer.setObjectMapper(objectMapper);
	
	
	RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration.defaultCacheConfig()
		.entryTtl(Duration.ofMinutes(10)).disableCachingNullValues()
		.serializeValuesWith(RedisSerializationContext.SerializationPair
			.fromSerializer(serializer));
	return RedisCacheManager.builder(RedisCacheWriter.nonLockingRedisCacheWriter(connectionFactory)).cacheDefaults(redisCacheConfiguration).build();
    }
}
