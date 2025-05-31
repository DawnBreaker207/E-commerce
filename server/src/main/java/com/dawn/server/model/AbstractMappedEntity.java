package com.dawn.server.model;

import java.io.Serial;
import java.io.Serializable;
import java.time.Instant;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@MappedSuperclass
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Data
public abstract class AbstractMappedEntity implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    @CreatedDate
    @JsonFormat(shape = Shape.STRING)
    @Column(name = "created_at")
    private Instant createdAt;

    @CreatedDate
    @JsonFormat(shape = Shape.STRING)
    @Column(name = "updated_at")
    private Instant updatedAt;
}
