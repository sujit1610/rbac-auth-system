package com.rbac.config;

import com.rbac.dto.RegisterRequest;
import com.rbac.entity.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    User toEntity(RegisterRequest request);
}
